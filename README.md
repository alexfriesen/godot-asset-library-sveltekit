# Godot Asset Library Sveltekit

Based on https://github.com/Calinou/godot-asset-library-laravel with sveltekit instead of laravel.

## Developing

You need to install [Node.js](https://nodejs.org/en/download/) (16.x or later) and installed dependencies with `npm install` (or `pnpm install` or `yarn`).

To start the development server: 

```bash
npm run db:types
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
