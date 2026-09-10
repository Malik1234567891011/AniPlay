import { z } from 'zod';
import { LOCALES } from '@aniplay/i18n';

/**
 * The locale, as a schema.
 *
 * The list itself lives in `@aniplay/i18n`, which is a leaf package with no
 * workspace dependencies, so there is exactly one place a third locale would be
 * added and no chance of the schema and the formatter disagreeing about what
 * exists.
 *
 * **Both locales are permanent and first class.** `en` is not "no locale" and
 * `fr` is not a mode — a `locale` field is never optional in a way that makes
 * English the absence of a choice.
 */
export const LocaleSchema = z.enum(LOCALES);
export type Locale = z.infer<typeof LocaleSchema>;
