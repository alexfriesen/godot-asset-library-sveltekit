<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '$lib/components/Meta.svelte';
	import Date from '$lib/components/Date.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import AssetReviews from '$lib/asset/reviews.svelte';
	import PreviewGallery from '$lib/asset/preview-gallery.svelte';
	import AssetVersionHistory from '$lib/asset/version/version-history.svelte';
	import {
		findAssetIssuesUrl,
		findCategoryIcon,
		findCategoryName,
		findDownloadUrl,
		findIconUrl,
		findLatestVerion,
		findLicenseName
	} from '$lib/asset/asset.helper';
	import { getAssetTags } from '$lib/asset/tags';
	import { canEditAsset, isAdmin } from '$lib/permissions';

	import { t } from '$lib/translations';
	import type { PageData } from './$types';

	export let data: PageData;

	$: asset = data.asset;
	$: currentUser = data.currentUser;
</script>

<Meta
	title={asset.title}
	description={asset.description}
	image={asset.icon_url ? { url: asset.icon_url } : undefined}
	canonical={$page.url.href}
	noindex={true}
/>

<article class="container">
	{#if asset.is_archived}
		<Alert type="warning">
			{$t('This asset is marked as archived by its author. No further updates will be provided.')}
		</Alert>
	{/if}

	{#if !asset.is_published}
		<Alert type="warning">
			{$t(
				"This asset has been unpublished. It won't be visible by other users until it's made public by an administrator."
			)}
		</Alert>
	{/if}

	<div class="lg:flex lg:-mx-6">
		<main class="lg:w-1/2 lg:px-6">
			<div class="flex mb-5">
				<div class="flex-shrink-0 self-center">
					<img
						fetchpriority="high"
						class="object-cover w-26 h-26 bg-gray-400 dark:bg-gray-700 rounded"
						src={findIconUrl(asset)}
						alt={$t('asset icon')}
					/>
				</div>
				<div class="ml-6">
					<h1 class="text-xl font-medium">{asset.title}</h1>
					<h2 class="text-lg text-gray-600 mb-2">
						{$t('by')}
						<a href={'/user/' + asset.author.id} class="link">
							{asset.author.username}
						</a>
					</h2>
					<Badge href={`/?category_id=${asset.category_id}`} class="font-bold text-sm">
						<Icon type={findCategoryIcon(asset)} class="fa-fw mr-1 -ml-1 opacity-75" />
						{findCategoryName(asset)}
					</Badge>
				</div>
			</div>

			{#if asset.tags}
				<div class="flex gap-1 mt-5 mb-6 -ml-1 text-sm">
					{#each getAssetTags(asset) as tag}
						<Badge href={`/?filter=${tag}`}>
							{tag}
						</Badge>
					{/each}
				</div>
			{/if}

			{#if asset.blurb}
				<h2 class="text-lg font-medium mb-6">
					{asset.blurb}
				</h2>
			{/if}

			<div class="content">
				<!-- The HTML description is already sanitized by the Markdown parser that generates it -->
				{@html asset.html_description}
			</div>

			<div class="mt-6 text-gray-600 dark:text-gray-500 leading-relaxed">
				<div>
					<Icon type="gavel" class="fa-fw mr-1 opacity-75" />
					<strong>{$t('License:')}</strong>
					{findLicenseName(asset)}
				</div>
				<div>
					<Icon type="newspaper-o" class="fa-fw mr-1 opacity-75" />
					<strong>{$t('Latest version:')}</strong>
					{findLatestVerion(asset)?.version_string}
					({$t('released')}
					<Date date={findLatestVerion(asset)?.created_at} />)
				</div>
			</div>

			<AssetVersionHistory {asset} />

			<div class="mt-8 mb-6 text-sm">
				<Button
					href={findDownloadUrl(asset)}
					rel="nofollow"
					color="success"
					class="font-bold mr-1 mb-2"
				>
					<Icon type="download" class="mr-1" />
					{$t('Download')}
				</Button>
				<Button href={asset.browse_url} rel="nofollow" color="secondary" class="mr-1 mb-2">
					<Icon type="code" class="mr-1" />
					{$t('Source code')}
				</Button>
				<Button href={findAssetIssuesUrl(asset)} rel="nofollow" color="secondary" class="mr-1 mb-2">
					<Icon type="exclamation-circle" class="mr-1 opacity-75" />
					{$t('Submit an issue')}
				</Button>
				{#if asset.changelog_url}
					<Button href={asset.changelog_url} rel="nofollow" color="secondary" class="mr-1">
						<Icon type="newspaper-o" class="mr-1 opacity-75" />
						{$t('Changelog')}
					</Button>
				{/if}
				{#if asset.donate_url}
					<Button href={asset.donate_url} rel="nofollow" color="secondary">
						<Icon type="heart" class="mr-1 opacity-75" />
						{$t('Donate')}
					</Button>
				{/if}
			</div>

			{#if canEditAsset(currentUser, asset)}
				<div class="mb-4 text-sm">
					<Button
						color="primary"
						href={`/asset/${asset.asset_id}/edit`}
						class="font-bold mr-1 mb-2"
					>
						<Icon type="pencil" class="mr-1" />
						{$t('Edit')}
					</Button>

					<FormGroup path={`/asset/${asset.asset_id}`} action="update" class="inline-block">
						<input
							hidden
							type="checkbox"
							name="is_archived"
							value={Number(!asset.is_archived)}
							checked
						/>
						<Button type="submit" color="secondary" class="mr-1 mb-2">
							<Icon type={asset.is_archived ? 'unlock' : 'lock'} class="mr-1 opacity-75" />
							{asset.is_archived ? $t('Unarchive') : $t('Archive')}
						</Button>
					</FormGroup>

					{#if isAdmin(currentUser)}
						<FormGroup path={`/asset/${asset.asset_id}`} action="update" class="inline-block">
							<input
								hidden
								type="checkbox"
								name="is_published"
								value={Number(!asset.is_published)}
								checked
							/>
							<Button type="submit" color="secondary">
								<Icon type={asset.is_published ? 'eye-slash' : 'eye'} class="mr-1 opacity-75" />
								{asset.is_published ? $t('Unpublish') : $t('Publish')}
							</Button>
						</FormGroup>
					{/if}
				</div>
			{/if}
		</main>

		<aside class="lg:w-1/2 lg:px-6">
			{#if asset.previews.length >= 1}
				<PreviewGallery {asset} />
			{:else}
				<div class="flex items-center justify-center h-64 bg-gray-400 dark:bg-gray-800 rounded">
					<div class="text-lg text-gray-600 dark:text-gray-500">
						{$t('No preview available')}
					</div>
				</div>
			{/if}
		</aside>
	</div>

	<AssetReviews {asset} user={currentUser} />
</article>

<style>
</style>
