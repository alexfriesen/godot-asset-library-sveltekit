<script lang="ts">
	import { page } from '$app/stores';
	import Meta from '$lib/components/Meta.svelte';
	import Date from '$lib/components/Date.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import BadgeLink from '$lib/components/BadgeLink.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import AssetReviews from '$lib/asset/reviews.svelte';
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
</script>

<Meta
	title={data.asset.title}
	description={data.asset.description}
	image={data.asset.icon_url ? { url: data.asset.icon_url } : undefined}
	canonical={$page.url.href}
	noindex={true}
/>

<article class="container">
	{#if data.asset.is_archived}
		<Alert type="warning">
			{$t('This asset is marked as archived by its author. No further updates will be provided.')}
		</Alert>
	{/if}

	{#if !data.asset.is_published}
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
						src={findIconUrl(data.asset)}
						alt={$t('asset icon')}
					/>
				</div>
				<div class="ml-6">
					<h1 class="text-xl font-medium">{data.asset.title}</h1>
					<h2 class="text-lg text-gray-600 mb-2">
						{$t('by')}
						<a href={'/user/' + data.asset.user.id} class="link">
							{data.asset.user.username}
						</a>
					</h2>
					<BadgeLink href={`/?category_id=${data.asset.category_id}`} class="font-bold text-sm">
						<Icon type={findCategoryIcon(data.asset)} class="fa-fw mr-1 -ml-1 opacity-75" />
						{findCategoryName(data.asset)}
					</BadgeLink>
				</div>
			</div>

			{#if data.asset.tags}
				<div class="mt-5 mb-6 -ml-1 text-sm">
					{#each getAssetTags(data.asset) as tag}
						<BadgeLink href={`/?filter=${tag}`}>
							{tag}
						</BadgeLink>
					{/each}
				</div>
			{/if}

			{#if data.asset.blurb}
				<h2 class="text-lg font-medium mb-6">
					{data.asset.blurb}
				</h2>
			{/if}

			<div class="content">
				<!-- The HTML description is already sanitized by the Markdown parser that generates it -->
				{@html data.asset.html_description}
			</div>

			<div class="mt-6 text-gray-600 dark:text-gray-500 leading-relaxed">
				<div>
					<Icon type="gavel" class="fa-fw mr-1 opacity-75" />
					<strong>{$t('License:')}</strong>
					{findLicenseName(data.asset)}
				</div>
				<div>
					<Icon type="newspaper-o" class="fa-fw mr-1 opacity-75" />
					<strong>{$t('Latest version:')}</strong>
					{findLatestVerion(data.asset).version_string}
					({$t('released')}
					<Date date={findLatestVerion(data.asset).created_at} />)
				</div>
			</div>

			<AssetVersionHistory asset={data.asset} />

			<div class="mt-8 mb-6 text-sm">
				<Button
					href={findDownloadUrl(data.asset)}
					rel="nofollow"
					color="success"
					class="font-bold mr-1 mb-2"
				>
					<Icon type="download" class="mr-1" />
					{$t('Download')}
				</Button>
				<Button href={data.asset.browse_url} rel="nofollow" color="secondary" class="mr-1 mb-2">
					<Icon type="code" class="mr-1" />
					{$t('Source code')}
				</Button>
				<Button
					href={findAssetIssuesUrl(data.asset)}
					rel="nofollow"
					color="secondary"
					class="mr-1 mb-2"
				>
					<Icon type="exclamation-circle" class="mr-1 opacity-75" />
					{$t('Submit an issue')}
				</Button>
				{#if data.asset.changelog_url}
					<Button href={data.asset.changelog_url} rel="nofollow" color="secondary" class="mr-1">
						<Icon type="newspaper-o" class="mr-1 opacity-75" />
						{$t('Changelog')}
					</Button>
				{/if}
				{#if data.asset.donate_url}
					<Button href={data.asset.donate_url} rel="nofollow" color="secondary">
						<Icon type="heart" class="mr-1 opacity-75" />
						{$t('Donate')}
					</Button>
				{/if}
			</div>

			{#if canEditAsset(data.currentUser, data.asset)}
				<div class="mb-4 text-sm">
					<Button
						color="primary"
						href={`/asset/${data.asset.asset_id}/edit`}
						class="font-bold mr-1 mb-2"
					>
						<Icon type="pencil" class="mr-1" />
						{$t('Edit')}
					</Button>

					<FormGroup path={`/asset/${data.asset.asset_id}`} action="update" class="inline-block">
						<input
							hidden
							type="checkbox"
							name="is_archived"
							value={Number(!data.asset.is_archived)}
							checked
						/>
						<Button type="submit" color="secondary" class="mr-1 mb-2">
							<Icon type={data.asset.is_archived ? 'unlock' : 'lock'} class="mr-1 opacity-75" />
							{data.asset.is_archived ? $t('Unarchive') : $t('Archive')}
						</Button>
					</FormGroup>

					<!-- @can('admin') -->
					{#if isAdmin(data.currentUser)}
						<FormGroup path={`/asset/${data.asset.asset_id}`} action="update" class="inline-block">
							<input
								hidden
								type="checkbox"
								name="is_published"
								value={Number(!data.asset.is_published)}
								checked
							/>
							<Button type="submit" color="secondary">
								<Icon
									type={data.asset.is_published ? 'eye-slash' : 'eye'}
									class="mr-1 opacity-75"
								/>
								{data.asset.is_published ? $t('Unpublish') : $t('Publish')}
							</Button>
						</FormGroup>
					{/if}
				</div>
			{/if}
		</main>

		<aside class="lg:w-1/2 lg:px-6">
			<!-- {-- Large image display --} -->
			{#if data.asset.asset_previews.length >= 1 && data.asset.asset_previews[0].type_id === 0}
				<a
					id="gallery-image-anchor"
					href={data.asset.asset_previews[0].link}
					target="_blank"
					rel="nofollow noopener noreferrer"
				>
					<div class="relative pb-9/16 bg-gray-400 dark:bg-gray-700 rounded">
						<img
							loading="lazy"
							id="gallery-image-big"
							src={data.asset.asset_previews[0].link}
							alt={data.asset.asset_previews[0].caption}
							class="absolute h-full w-full object-cover rounded"
						/>
					</div>
				</a>

				<!-- {-- Caption --} -->
				<div id="gallery-image-caption" class="text-center text-gray-700 dark:text-gray-500 my-3">
					<!-- {-- Use a non-breaking space to ensure consistent height if there is no caption --} -->
					{data.asset.asset_previews[0].caption || ' '}
				</div>
			{:else}
				<div class="flex items-center justify-center h-64 bg-gray-400 dark:bg-gray-800 rounded">
					<div class="text-lg text-gray-600 dark:text-gray-500">
						{$t('No preview available')}
					</div>
				</div>
			{/if}

			<!-- {-- Small image displays --} -->
			{#if data.asset.asset_previews.length >= 2}
				<div class="flex justify-center mt-2 -mx-px">
					{#each data.asset.asset_previews as preview, index}
						{#if preview.type_id === 0}
							<div class="w-1/4 px-px">
								<a href={preview.link} target="_blank" rel="nofollow noopener noreferrer">
									<div class="relative pb-9/16 bg-gray-400 dark:bg-gray-700 rounded">
										<img
											loading="lazy"
											src={preview.thumbnail ?? preview.link}
											alt={preview.caption}
											class="absolute h-full w-full object-cover rounded gallery-image-small {index ===
											0
												? 'gallery-image-small-active'
												: 'gallery-image-small-inactive'}"
											data-full-size={preview.link}
										/>
									</div>
								</a>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</aside>
	</div>

	<AssetReviews asset={data.asset} user={data.currentUser} />
</article>

<style>
</style>
