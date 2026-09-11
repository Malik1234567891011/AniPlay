import { useMemo } from 'react';
import { categoryLabel, translatorFor, type Translator } from '@aniplay/i18n';
import { useStore } from '../state/store.jsx';

/**
 * The interface translator, bound to the app's current language.
 *
 * Deliberately not `react-i18next`. That library carries its own copy of the
 * current language, which would be a second source of truth alongside
 * `AppState.locale` and would have to be kept in step with it — and its `t` is
 * typed as `(key: string)`, so a misspelled key renders the key. Here
 * `Translator` is keyed by `TranslationKey`, which is derived from the English
 * catalogue, so a typo is a compile error and a key nobody uses is visible.
 *
 * **This is the interface language, not the open run's language.** A screen
 * rendering a French run's beats in an English app is correct: the run's locale
 * is frozen in `GameState.locale` and travels with the session. Use
 * `useSessionT` for anything that belongs to a particular run.
 */
export function useT(): Translator {
  const { locale } = useStore();
  return useMemo(() => translatorFor(locale), [locale]);
}

/**
 * The word for a browse category, bound to the current locale.
 *
 * Separate from `useT` because the id comes from the server at runtime and is
 * not a `TranslationKey` the compiler can check — the fallback to the server's
 * own label is what makes that safe.
 */
export function useCategoryLabel(): (id: string, fallback: string) => string {
  const { locale } = useStore();
  return useMemo(() => (id: string, fallback: string) => categoryLabel(locale, id, fallback), [locale]);
}
