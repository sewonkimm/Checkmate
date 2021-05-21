import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import langEN from './en/lang.json';
import langKR from './ko/lang.json';
import langZH from './zh/lang.json';

const resources = {
  en: {
    translation: langEN,
  },
  ko: {
    translation: langKR,
  },
  zh: {
    translation: langZH,
  },
} as const;

const userLanguage = window.navigator.language;

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || userLanguage || 'en',
  fallbackLng: {
    ko: ['ko'],
    default: ['en'],
  },
  debug: false,
  defaultNS: 'translation',
  ns: 'translation',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
export const languages = ['English', '한국어', '中文(简体)'] as const;
export type Languages = typeof languages[number]; // 'en' | 'ko'
