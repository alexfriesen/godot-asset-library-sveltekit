<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { t, locale, locales, loadTranslations } from '$lib/translations';
	import { isAdmin } from '$lib/permissions';

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
	import Header from '$lib/layout/Header.svelte';
	import PreloadingIndicator from '$lib/layout/PreloadingIndicator.svelte';
	import Meta from '$lib/components/Meta.svelte';
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

<footer class="mt-12 py-12 bg-gray-300 text-gray-600 dark:bg-gray-900 text-center">
	© 2019-2022 —
	<a class="link" href="/developer/v1/" data-barba-prevent>
		{$t('API documentation')}
	</a>
	{#if isAdmin(data.currentUser)}
		—
		<a class="link" href="/admin">
			{$t('Administration panel')}
		</a>
	{/if}
</footer>

<style>
</style>
