import { createI18n } from 'vue-i18n'

const en = require('./locales/en.json')
const es = require('./locales/es.json')

export const i18n = createI18n({
  legacy: true,
  locale: localStorage.getItem('languageShoppingCart') || 'en',
  messages: {
    en,
    es
  }
})
