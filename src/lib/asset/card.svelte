<script lang="ts">
	import type { Asset } from '@prisma/client';
	import { formatDistanceToNow } from 'date-fns';
	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/translations';

	import { getSupportLevelClass, getSupportLevelIcon, getSupportLevelName } from './support-level';
	import { getScoreColor } from './score';
	import {
		findCategoryIcon,
		findCategoryName,
		findIconUrl,
		findLatestVerion,
		findLicenseName
	} from './asset.helper';

	export let asset: Asset;

	let latestVersion = findLatestVerion(asset);
	const tooltip = [
		latestVersion &&
			`Latest version: ${latestVersion?.version_string} (released ${formatDistanceToNow(
				latestVersion?.created_at
			)})`,
		`Last page update: ${formatDistanceToNow(asset.modify_date)}`,
		`License: ${findLicenseName(asset)}`,
		asset.tags && `Tags: ${asset.tags || ''}`
	].join('\n');
</script>

<a href={`/asset/${asset.asset_id}`} title={tooltip}>
	<article class="flex bg-white dark:bg-gray-800 rounded shadow hover-active-darken">
		<div class="flex-shrink-0 self-center">
			<!--
					Use smaller icons on mobile displays. Do not round the right side of
					the icon on larger displays, as its height will match the card height.
				-->
			<img
				loading="lazy"
				class="object-cover w-20 h-20 sm:w-26 sm:h-26 bg-gray-400 dark:bg-gray-700 rounded sm:rounded-r-none"
				src={findIconUrl(asset)}
				alt={$t('asset icon')}
			/>
		</div>
		<!-- 
				Offset the right panel slightly on the Y axis to make tags
				appear slightly further from the bottom, which looks better
        	-->
		<div class="ml-3 md:ml-6 lg:ml-3 xl:ml-6 py-3 pl-1 -mt-px mb-px w-full pr-3">
			<div class="flex space-between">
				<div class="leading-relaxed font-medium">{asset.title}</div>
				<div class="flex-grow text-right text-sm {getScoreColor(asset)}">
					<Icon type={asset.score >= 0 ? 'thumbs-up' : 'thumbs-down'} class="mr-1 opacity-50" />
					{asset.score}
				</div>
			</div>
			<div class="leading-relaxed text-gray-600 text-sm my-px">
				{#if asset.blurb}
					{asset.blurb}
				{:else}
					{$t('by {{author}}', { author: asset.author?.username })}
				{/if}
			</div>
			<div class="text-sm -ml-px mt-2">
				<span
					class="m-1 px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
				>
					<Icon type={findCategoryIcon(asset)} class="fa-fw mr-1 -ml-1 opacity-75" />
					{findCategoryName(asset)}
				</span>
				{#if latestVersion}
					<span class="m-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
						{latestVersion.godot_version}
					</span>
				{/if}
				<span class="m-1 px-3 py-1 rounded-full {getSupportLevelClass(asset)}">
					{#if getSupportLevelIcon(asset)}
						<Icon type={getSupportLevelIcon(asset)} class="fa-fw mr-1 -ml-1 opacity-75" />
					{/if}
					{getSupportLevelName(asset)}
				</span>
			</div>
		</div>
	</article>
</a>

<style lang="postcss">
	.hover-active-darken {
		--filter-hover: brightness(93.5%);
		--filter-active: brightness(87%);
	}
	.hover-active-darken:hover {
		filter: var(--filter-hover);
	}
	.hover-active-darken:active {
		filter: var(--filter-active);
	}

	@screen dark {
		.hover-active-darken {
			--filter-hover: brightness(125%);
			--filter-active: brightness(75%);
		}
	}
</style>
