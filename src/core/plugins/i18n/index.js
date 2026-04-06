/**
 * @prettier
 */
import reducers from "./reducers"
import * as actions from "./actions"
import * as selectors from "./selectors"
import { translate } from "./fn"
import en from "./locales/en"
import win from "core/window"

export default function I18nPlugin() {
  return {
    afterLoad(system) {
      // ── 1. Load built-in English messages ────────────────────────────────
      system.i18nActions.loadMessages("en", en)

      // ── 2. Determine locale ──────────────────────────────────────────────
      const { locale: configLocale } = system.getConfigs()
      let locale = configLocale
      if (!locale) {
        const browserLang =
          (win.navigator &&
            win.navigator.languages &&
            win.navigator.languages[0]) ||
          (win.navigator && win.navigator.language) ||
          "en"
        locale = browserLang.split("-")[0].toLowerCase()
      }
      system.i18nActions.setLocale(locale)

      // ── 3. Register the t() translation function ─────────────────────────
      this.rootInjects = this.rootInjects || {}
      this.rootInjects.t = (key, vars) => {
        const allMessages = system.i18nSelectors.getMessages()
        const currentLocale = system.i18nSelectors.getLocale()

        const localeMap = allMessages.get(currentLocale)
        const enMap = allMessages.get("en")

        const localeMsgs = localeMap ? localeMap.toJS() : null
        const fallbackMsgs = enMap ? enMap.toJS() : en

        return translate(localeMsgs, fallbackMsgs, key, vars)
      }
    },

    statePlugins: {
      i18n: {
        reducers,
        actions,
        selectors,
      },
    },
  }
}
