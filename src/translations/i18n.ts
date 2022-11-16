import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { es, en, pt } from 'translations'

const resources = {
  en,
  es,
  pt,
}

export const availableLanguages = Object.keys(resources)

const fixedLanguage = localStorage.getItem('language') || 'en'

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  defaultNS: 'home',
  fallbackLng: fixedLanguage,
})
