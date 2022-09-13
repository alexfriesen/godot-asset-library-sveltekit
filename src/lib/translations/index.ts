import i18n, { type Config } from 'sveltekit-i18n';
import lang from './lang.json';

export const config: Config = {
  fallbackLocale: 'en',
  translations: {
    en: { lang },
  },
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
