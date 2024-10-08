import {TranslateOptions} from 'i18n-js';
import {TxKeyPath, i18n} from './i18n';

/**
 * Translates text.
 *
 * @param key The i18n key.
 * @param options The i18n options.
 * @returns The translated text.
 *
 * @example
 * Translations:
 *
 * ```en.ts
 * {
 *  "hello": "Hello, {{name}}!"
 * }
 * ```
 *
 * @uses
 * ```ts
 * import { translate } from "./i18n"
 *
 * translate("common.ok", { name: "world" })
 * // => "Hello world!"
 * ```
 */
export function translate(key: TxKeyPath, options?: TranslateOptions) {
  return i18n.t(key, options);
}
