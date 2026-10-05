import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import id from './locales/id'

export const defaultLocale = 'id-ID' as const

void i18n.use(initReactI18next).init({
  resources: {
    'id-ID': { translation: id },
  },
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  interpolation: { escapeValue: false },
})

export default i18n
