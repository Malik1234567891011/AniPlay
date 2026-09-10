import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  BootstrapResponse,
  Locale,
  QualityTier,
  WalletSummary,
} from '@aniplay/contracts';
import { DEFAULT_LOCALE, isLocale } from '@aniplay/i18n';
import { applyDeviceTimeZone, deviceLocale } from '../i18n/device.js';
import { api, ApiError } from '../api/client.js';
import { auth, AuthError } from '../auth/index.js';

/**
 * App-wide state.
 *
 * Deliberately small: the wallet balance, the identity token, onboarding
 * progress, and the bootstrap payload. Session state lives on the session screen
 * and the server is authoritative for all of it (spec §0 rule 3).
 */

const STORAGE_KEYS = {
  ageVerified: 'aniplay.ageVerified',
  tastes: 'aniplay.tastes',
  quality: 'aniplay.qualityTier',
  drafts: 'aniplay.composerDrafts',
  locale: 'aniplay.locale',
} as const;

export interface AppState {
  ready: boolean;
  /** The signed-in account's id, or the anonymous one standing in for it. */
  userId: string | null;
  email: string | null;
  isGuest: boolean;
  /** False in a build with no Supabase project, where sign-in cannot work. */
  authConfigured: boolean;
  ageVerified: boolean;
  onboardingComplete: boolean;
  tastes: string[];
  bootstrap: BootstrapResponse | null;
  wallet: WalletSummary | null;
  qualityTier: QualityTier;
  offline: boolean;
  /**
   * The language the **interface** is in, and the language a run started from
   * here will be created in.
   *
   * Not the language of the run currently open — that is `GameState.locale`,
   * frozen when it was created, and it does not move when this does. A player
   * with an English run and a French run sees each in the language it was
   * started in.
   */
  locale: Locale;
  /**
   * `null` until the player picks a language explicitly. Distinct from
   * `locale`, which always holds a real answer: null here means "nobody has
   * chosen", which is what lets the device be consulted at all.
   */
  localeChoice: Locale | null;
}

type Action =
  | {
      type: 'HYDRATED';
      identity: { userId: string; email: string | null; isGuest: boolean } | null;
      ageVerified: boolean;
      tastes: string[];
      quality: QualityTier | null;
      localeChoice: Locale | null;
    }
  | { type: 'BOOTSTRAPPED'; bootstrap: BootstrapResponse }
  | { type: 'IDENTITY'; identity: { userId: string; email: string | null; isGuest: boolean } | null }
  | { type: 'SET_AGE_VERIFIED' }
  | { type: 'SET_TASTES'; tastes: string[] }
  | { type: 'SET_WALLET'; wallet: WalletSummary }
  | { type: 'SET_BALANCE'; balance: number }
  | { type: 'SET_QUALITY'; tier: QualityTier }
  | { type: 'SET_LOCALE'; choice: Locale | null }
  | { type: 'SET_OFFLINE'; offline: boolean };

const initialState: AppState = {
  ready: false,
  userId: null,
  email: null,
  isGuest: true,
  authConfigured: auth.configured,
  ageVerified: false,
  onboardingComplete: false,
  tastes: [],
  bootstrap: null,
  wallet: null,
  qualityTier: 'VIVID',
  offline: false,
  locale: DEFAULT_LOCALE,
  localeChoice: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATED':
      return {
        ...state,
        ready: true,
        userId: action.identity?.userId ?? null,
        email: action.identity?.email ?? null,
        isGuest: action.identity?.isGuest ?? true,
        ageVerified: action.ageVerified,
        onboardingComplete: action.ageVerified,
        tastes: action.tastes,
        qualityTier: action.quality ?? state.qualityTier,
        localeChoice: action.localeChoice,
        // An explicit choice wins; otherwise ask the device, which answers
        // `en` until French is switched on. Never a stored `locale` — the
        // choice is the durable fact and this is derived from it.
        locale: action.localeChoice ?? deviceLocale(),
      };
    case 'BOOTSTRAPPED':
      return {
        ...state,
        bootstrap: action.bootstrap,
        wallet: action.bootstrap.wallet,
        qualityTier: state.qualityTier ?? action.bootstrap.defaultQualityTier,
        offline: false,
      };
    case 'IDENTITY':
      return {
        ...state,
        userId: action.identity?.userId ?? null,
        email: action.identity?.email ?? null,
        isGuest: action.identity?.isGuest ?? true,
      };
    case 'SET_AGE_VERIFIED':
      return { ...state, ageVerified: true, onboardingComplete: true };
    case 'SET_TASTES':
      return { ...state, tastes: action.tastes };
    case 'SET_WALLET':
      return { ...state, wallet: action.wallet };
    case 'SET_BALANCE':
      return state.wallet ? { ...state, wallet: { ...state.wallet, balance: action.balance } } : state;
    case 'SET_QUALITY':
      return { ...state, qualityTier: action.tier };
    case 'SET_LOCALE':
      return {
        ...state,
        localeChoice: action.choice,
        locale: action.choice ?? deviceLocale(),
      };
    case 'SET_OFFLINE':
      return { ...state, offline: action.offline };
  }
}

export interface AppStore extends AppState {
  /** Spec §6.4 — no password is ever created. */
  sendEmailCode(email: string): Promise<void>;
  verifyEmailCode(email: string, code: string): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  confirmAge(): Promise<void>;
  setTastes(tastes: string[]): Promise<void>;
  setQualityTier(tier: QualityTier): Promise<void>;
  /**
   * Choose the interface language, or pass `null` to go back to following the
   * device. Runs already in progress keep the language they were created in.
   */
  setLocale(choice: Locale | null): Promise<void>;
  refreshWallet(): Promise<void>;
  setBalance(balance: number): void;
  refreshBootstrap(): Promise<void>;
  saveDraft(sessionId: string, text: string): Promise<void>;
  loadDraft(sessionId: string): Promise<string>;
}

const StoreContext = createContext<AppStore | null>(null);

export function AppStoreProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const hydrating = useRef(false);

  // Boot: restore identity, then bootstrap. A guest token is minted locally so
  // the player can browse and start one session before any account exists (§6.3).
  useEffect(() => {
    if (hydrating.current) return;
    hydrating.current = true;

    // Every request asks the auth store for a token, so one that expired while
    // the app was backgrounded is renewed rather than sent and rejected.
    api.setTokenProvider(() => auth.accessToken());

    void (async () => {
      // The polyfill read the engine's time zone at import; `expo-localization`
      // knows it even on a Hermes build whose `Intl` reported nothing.
      applyDeviceTimeZone();

      const [identity, ageVerified, tastes, quality, storedLocale] = await Promise.all([
        auth.restore(),
        AsyncStorage.getItem(STORAGE_KEYS.ageVerified),
        AsyncStorage.getItem(STORAGE_KEYS.tastes),
        AsyncStorage.getItem(STORAGE_KEYS.quality),
        AsyncStorage.getItem(STORAGE_KEYS.locale),
      ]);

      dispatch({
        type: 'HYDRATED',
        identity,
        ageVerified: ageVerified === 'true',
        tastes: tastes ? (JSON.parse(tastes) as string[]) : [],
        quality: (quality as QualityTier | null) ?? null,
        localeChoice: isLocale(storedLocale) ? storedLocale : null,
      });

      try {
        dispatch({ type: 'BOOTSTRAPPED', bootstrap: await api.bootstrap() });
      } catch (error) {
        if (error instanceof ApiError && error.code === 'OFFLINE') {
          dispatch({ type: 'SET_OFFLINE', offline: true });
        }
      }
    })();
  }, []);

  /**
   * Signing in upgrades the guest in place rather than creating a second
   * account and merging it: the guest already *is* a Supabase user, and
   * `guest-migrate` reconciles the older device-local case (§6.5).
   */
  const adopt = useCallback(async (identity: { userId: string; email: string | null; isGuest: boolean }) => {
    dispatch({ type: 'IDENTITY', identity });
    try {
      dispatch({ type: 'BOOTSTRAPPED', bootstrap: await api.bootstrap() });
    } catch {
      // The identity is real either way; the shelf can refill on the next screen.
    }
  }, []);

  const sendEmailCode = useCallback(async (email: string) => {
    await auth.sendEmailCode(email);
  }, []);

  const verifyEmailCode = useCallback(
    async (email: string, code: string) => {
      const previous = auth.identity;
      const identity = await auth.verifyEmailCode(email, code);
      if (previous?.isGuest && previous.userId !== identity.userId) {
        await api.migrateGuest(previous.userId, identity.email ?? 'Player').catch(() => undefined);
      }
      await adopt(identity);
    },
    [adopt],
  );

  const signInWithApple = useCallback(async () => {
    const previous = auth.identity;
    // Imported lazily: the module touches native Apple APIs at load, and
    // Android and the web build have no business paying for that.
    const apple = await import('expo-apple-authentication');
    if (!(await apple.isAvailableAsync())) {
      throw new AuthError('Sign in with Apple is not available on this device.', 'UNAVAILABLE');
    }
    const credential = await apple.signInAsync({
      requestedScopes: [apple.AppleAuthenticationScope.EMAIL, apple.AppleAuthenticationScope.FULL_NAME],
    });
    if (!credential.identityToken) {
      throw new AuthError('Apple did not return a sign-in token. Try again.', 'NO_IDENTITY_TOKEN');
    }
    const identity = await auth.signInWithIdToken('apple', credential.identityToken);
    if (previous?.isGuest && previous.userId !== identity.userId) {
      await api.migrateGuest(previous.userId, identity.email ?? 'Player').catch(() => undefined);
    }
    await adopt(identity);
  }, [adopt]);

  const signOut = useCallback(async () => {
    await auth.signOut();
    dispatch({ type: 'IDENTITY', identity: auth.identity });
    try {
      dispatch({ type: 'BOOTSTRAPPED', bootstrap: await api.bootstrap() });
    } catch {
      // Signed out is still a usable state; Discover works for a guest.
    }
  }, []);

  const confirmAge = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.ageVerified, 'true');
    dispatch({ type: 'SET_AGE_VERIFIED' });
    // Persist server-side too, so the gate survives a reinstall (§6.2).
    void api.updateMe({ ageVerified: true }).catch(() => {});
  }, []);

  const setTastes = useCallback(async (tastes: string[]) => {
    await AsyncStorage.setItem(STORAGE_KEYS.tastes, JSON.stringify(tastes));
    dispatch({ type: 'SET_TASTES', tastes });
  }, []);

  const setQualityTier = useCallback(async (tier: QualityTier) => {
    await AsyncStorage.setItem(STORAGE_KEYS.quality, tier);
    dispatch({ type: 'SET_QUALITY', tier });
  }, []);

  const setLocale = useCallback(async (choice: Locale | null) => {
    // Stored on the device as well as on the account, because the language the
    // interface is in has to survive a cold start before `/v1/me` answers.
    if (choice) await AsyncStorage.setItem(STORAGE_KEYS.locale, choice);
    else await AsyncStorage.removeItem(STORAGE_KEYS.locale);
    dispatch({ type: 'SET_LOCALE', choice });
    void api.updateMe({ settings: { locale: choice } }).catch(() => {});
  }, []);

  const refreshWallet = useCallback(async () => {
    try {
      const response = await api.wallet();
      dispatch({ type: 'SET_WALLET', wallet: response.wallet });
    } catch {
      // A stale balance is better than a blocked screen; the server is
      // authoritative at spend time regardless.
    }
  }, []);

  const setBalance = useCallback((balance: number) => {
    dispatch({ type: 'SET_BALANCE', balance });
  }, []);

  const refreshBootstrap = useCallback(async () => {
    try {
      dispatch({ type: 'BOOTSTRAPPED', bootstrap: await api.bootstrap() });
    } catch {
      dispatch({ type: 'SET_OFFLINE', offline: true });
    }
  }, []);

  /** Spec §10.3 — composer input survives backgrounding and failed turns. */
  const saveDraft = useCallback(async (sessionId: string, text: string) => {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.drafts);
    const drafts = raw ? (JSON.parse(raw) as Record<string, string>) : {};
    if (text.trim().length === 0) delete drafts[sessionId];
    else drafts[sessionId] = text;
    await AsyncStorage.setItem(STORAGE_KEYS.drafts, JSON.stringify(drafts));
  }, []);

  const loadDraft = useCallback(async (sessionId: string) => {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.drafts);
    if (!raw) return '';
    return (JSON.parse(raw) as Record<string, string>)[sessionId] ?? '';
  }, []);

  const value = useMemo<AppStore>(
    () => ({
      ...state,
      sendEmailCode,
      verifyEmailCode,
      signInWithApple,
      signOut,
      confirmAge,
      setTastes,
      setQualityTier,
      setLocale,
      refreshWallet,
      setBalance,
      refreshBootstrap,
      saveDraft,
      loadDraft,
    }),
    [state, sendEmailCode, verifyEmailCode, signInWithApple, signOut, confirmAge, setTastes, setQualityTier, setLocale, refreshWallet, setBalance, refreshBootstrap, saveDraft, loadDraft],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): AppStore {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be used inside AppStoreProvider');
  return store;
}
