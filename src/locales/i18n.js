import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './en'
import viTranslation from './vi'
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: enTranslation,
            vi: viTranslation
        },
        supportedLngs: ['en', 'vi'],
        fallbackLng: 'en',
        debug: false, // Đổi thành false khi production
        interpolation: {
            escapeValue: false
        }
    })

export default i18n