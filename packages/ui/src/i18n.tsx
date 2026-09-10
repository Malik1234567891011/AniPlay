import React, { createContext, useContext, useMemo } from 'react';
import { DEFAULT_LOCALE, translatorFor, type Locale, type Translator } from '@aniplay/i18n';

/**
 * The design system's translator.
 *
 * `packages/ui` cannot reach the app's store — it is a library, and the app
 * depends on it rather than the other way round — so the locale is handed in
 * through a context that the app mounts once. This file exists so that
 * `components.tsx` needs only a mechanical `'Save'` → `{t('ui.save')}` edit and
 * no new plumbing of its own: that file is the active conflict surface and its
 * diff has to stay easy to rebase.
 *
 * The default is English rather than a throw. A design-system component
 * rendered in a test, a storybook, or a screen mounted above the provider
 * should draw the label it has always drawn, not crash.
 */

const UiLocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function UiLocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}): React.JSX.Element {
  return <UiLocaleContext.Provider value={locale}>{children}</UiLocaleContext.Provider>;
}

/** The locale the design system is currently drawing in. */
export function useUiLocale(): Locale {
  return useContext(UiLocaleContext);
}

/**
 * A translator bound to the interface locale.
 *
 * Keyed by `TranslationKey`, so a typo is a compile error rather than a key
 * rendered on screen.
 */
export function useUiT(): Translator {
  const locale = useUiLocale();
  return useMemo(() => translatorFor(locale), [locale]);
}
