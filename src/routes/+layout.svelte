<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { locale, loadTranslations } from '$lib/translations';

	export const load: Load = async ({ url }) => {
		const { pathname } = url;

		const defaultLocale = 'en'; // get from cookie, user session, ...
		const initLocale = locale.get() || defaultLocale;

		await loadTranslations(initLocale, pathname); // keep this just before the `return`

		return {};
	};
</script>

<script lang="ts">
	import { navigating, page } from '$app/stores';
	import Meta from '$lib/components/Meta.svelte';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import PreloadingIndicator from '$lib/layout/PreloadingIndicator.svelte';
	import '../app.postcss';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Meta title="Godot Asset Library" canonical={$page.url.href} openGraph={{ type: 'website' }} />

{#if $navigating}
	<PreloadingIndicator />
{/if}

<Header currentUser={data.currentUser} />
<main>
	<slot />
</main>
<Footer currentUser={data.currentUser} />

<style>
</style>
