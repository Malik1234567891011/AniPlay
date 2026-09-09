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
  QualityTier,
  WalletSummary,
} from '@aniplay/contracts';
import { api, ApiError } from '../api/client.js';

/**
 * App-wide state.
 *
 * Deliberately small: the wallet balance, the identity token, onboarding
 * progress, and the bootstrap payload. Session state lives on the session screen
 * and the server is authoritative for all of it (spec §0 rule 3).
 */

const STORAGE_KEYS = {
  token: 'aniplay.token',
  ageVerified: 'aniplay.ageVerified',
  tastes: 'aniplay.tastes',
  quality: 'aniplay.qualityTier',
  drafts: 'aniplay.composerDrafts',
} as const;

export interface AppState {
  ready: boolean;
  token: string | null;
  isGuest: boolean;
  ageVerified: boolean;
  onboardingComplete: boolean;
  tastes: string[];
  bootstrap: BootstrapResponse | null;
  wallet: WalletSummary | null;
  qualityTier: QualityTier;
  offline: boolean;
}

type Action =
  | { type: 'HYDRATED'; token: string | null; ageVerified: boolean; tastes: string[]; quality: QualityTier | null }
  | { type: 'BOOTSTRAPPED'; bootstrap: BootstrapResponse }
  | { type: 'SET_TOKEN'; token: string; isGuest: boolean }
  | { type: 'SET_AGE_VERIFIED' }
  | { type: 'SET_TASTES'; tastes: string[] }
  | { type: 'SET_WALLET'; wallet: WalletSummary }
  | { type: 'SET_BALANCE'; balance: number }
  | { type: 'SET_QUALITY'; tier: QualityTier }
  | { type: 'SET_OFFLINE'; offline: boolean };

const initialState: AppState = {
  ready: false,
  token: null,
  isGuest: true,
  ageVerified: false,
  onboardingComplete: false,
  tastes: [],
  bootstrap: null,
  wallet: null,
  qualityTier: 'VIVID',
  offline: false,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATED':
      return {
        ...state,
        ready: true,
        token: action.token,
        isGuest: action.token?.startsWith('guest_') ?? true,
        ageVerified: action.ageVerified,
        onboardingComplete: action.ageVerified,
        tastes: action.tastes,
        qualityTier: action.quality ?? state.qualityTier,
      };
    case 'BOOTSTRAPPED':
      return {
        ...state,
        bootstrap: action.bootstrap,
        wallet: action.bootstrap.wallet,
        qualityTier: state.qualityTier ?? action.bootstrap.defaultQualityTier,
        offline: false,
      };
    case 'SET_TOKEN':
      return { ...state, token: action.token, isGuest: action.isGuest };
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
    case 'SET_OFFLINE':
      return { ...state, offline: action.offline };
  }
}

export interface AppStore extends AppState {
  confirmAge(): Promise<void>;
  setTastes(tastes: string[]): Promise<void>;
  setQualityTier(tier: QualityTier): Promise<void>;
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

    void (async () => {
      const [token, ageVerified, tastes, quality] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.token),
        AsyncStorage.getItem(STORAGE_KEYS.ageVerified),
        AsyncStorage.getItem(STORAGE_KEYS.tastes),
        AsyncStorage.getItem(STORAGE_KEYS.quality),
      ]);

      let resolved = token;
      if (!resolved) {
        resolved = `guest_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
        await AsyncStorage.setItem(STORAGE_KEYS.token, resolved);
      }
      api.setToken(resolved);

      dispatch({
        type: 'HYDRATED',
        token: resolved,
        ageVerified: ageVerified === 'true',
        tastes: tastes ? (JSON.parse(tastes) as string[]) : [],
        quality: (quality as QualityTier | null) ?? null,
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
      confirmAge,
      setTastes,
      setQualityTier,
      refreshWallet,
      setBalance,
      refreshBootstrap,
      saveDraft,
      loadDraft,
    }),
    [state, confirmAge, setTastes, setQualityTier, refreshWallet, setBalance, refreshBootstrap, saveDraft, loadDraft],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): AppStore {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore must be used inside AppStoreProvider');
  return store;
}
