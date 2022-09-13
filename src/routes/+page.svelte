<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { t } from '$lib/translations';
	import AssetCard from '$lib/asset/card.svelte';
	import FormSelect from '$lib/components/FormSelect.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	export let data: PageData;

	let sort = $page.url.searchParams.get('sort') || undefined;
	let filter = $page.url.searchParams.get('filter') || undefined;

	const onSortChange = async (event: Event) => {
		const sort = (event.target as HTMLInputElement)?.value || '';
		$page.url.searchParams.set('sort', sort);
		await goto(`?${$page.url.searchParams.toString()}`);
		await invalidateAll();
	};

	$: assets = data.assets;
	$: totalAssets = data.totalAssets;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if !filter}
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
		{#if filter}
			{$t(
				'{{count:gt; 0:{{count:number;}} {{count; 1:result; default:results}}; default:No results}} for “{{filter}}”',
				{ count: totalAssets || 0, filter }
			)}
		{:else if sort === 'name'}
			{$t('Assets by name')}
		{:else if sort === 'rating'}
			{$t('Top-scoring assets')}
		{:else if sort === 'cost'}
			{$t('Assets by license')}
		{:else}
			{$t('Recent assets')}
		{/if}
	</h2>

	<section class="relative text-right mr-2">
		<form method="GET" action="/" id="sort-form" class="md:right-0 md:-mt-10">
			<FormSelect name="sort" label={$t('Sort by')} value={sort} on:change={onSortChange}>
				<option value="updated">{$t('Updated')}</option>
				<option value="name">{$t('Name')}</option>
				<option value="rating">{$t('Score')}</option>
				<option value="cost">{$t('License')}</option>
			</FormSelect>
		</form>
	</section>
	{#if assets.length > 0}
		<section class="grid grid-flow-row sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
			{#each assets as asset (asset.asset_id)}
				<AssetCard {asset} />
			{/each}
		</section>
		<Pagination totalItems={totalAssets} class="mt-8 flex justify-center" />
	{:else}
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
