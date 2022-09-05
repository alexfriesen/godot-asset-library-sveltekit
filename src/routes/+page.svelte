<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import AssetCard from '$lib/asset/card.svelte';
	import FormSelect from '$lib/components/FormSelect.svelte';
	import { t } from '$lib/translations';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if !$page.url.searchParams.has('filter')}
	<div class="bg-indigo-700 text-white -mt-8 mb-8 py-10">
		<div class="container">
			<h1 class="text-3xl font-medium mb-6">
				{$t('Welcome to the Godot Asset Library')}
			</h1>
			<p class="text-lg">
				{$t('Find add-ons, assets and scripts for your projects here.')}
			</p>
		</div>
	</div>
{/if}

<div class="container px-0">
	<h2 class="text-center text-2xl font-medium">
		{#if $page.url.searchParams.has('filter')}
			{$t(
				'{{count:gt; 0:{{count:number;}} {{count; 1:result; default:results}}; default:No results}} for “{{filter}}”',
				{ count: data.totalAssets || 0, filter: $page.url.searchParams.get('filter') }
			)}
		{:else if $page.url.searchParams.get('sort') === 'name'}
			{$t('Assets by name')}
		{:else if $page.url.searchParams.get('sort') === 'rating'}
			{$t('Top-scoring assets')}
		{:else if $page.url.searchParams.get('sort') === 'cost'}
			{$t('Assets by license')}
		{:else}
			{$t('Recent assets')}
		{/if}
	</h2>

	<section class="relative text-right mr-2">
		<form method="GET" action="/" id="sort-form" class="md:absolute md:right-0 md:-mt-10">
			<FormSelect name="sort" label={$t('Sort by')}>
				<option value="updated">{$t('Updated')}</option>
				<option value="name">{$t('Name')}</option>
				<option value="rating">{$t('Score')}</option>
				<option value="cost">{$t('License')}</option>
			</FormSelect>
		</form>
	</section>
	<section class="grid grid-flow-row sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
		{#each data.assets as asset (asset.asset_id)}
			<AssetCard {asset} />
		{/each}
	</section>
	{#if data.assets.length < 1}
		<div class="mt-12 text-lg text-center text-gray-600 leading-loose">
			{$t('No assets found.')}<br />
			<a class="link" href="/">
				{$t('View all assets')}
			</a>
		</div>
	{/if}
</div>

<style>
</style>
