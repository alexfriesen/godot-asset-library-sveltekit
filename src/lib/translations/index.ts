import i18n from 'sveltekit-i18n';
import parser from '@sveltekit-i18n/parser-default';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
  fallbackLocale: 'en',
  translations: {
    en: { lang },
  },
  parser: parser(),
  loaders: [
    {
      locale: 'en',
      key: 'default',
      loader: async () => (await import('./en/default.json')).default,
    },
    // {
    //   locale: 'en',
    //   key: 'asset',
    //   routes: ['/asset'],
    //   loader: async () => (await import('./en/asset.json')).default,
    // },
    // {
    //   locale: 'en',
    //   key: 'admin',
    //   routes: ['/'],
    //   loader: async () => (await import('./en/admin.json')).default,
    // },
  ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
