<script lang="ts">
	import type { Asset } from '@prisma/client';

	import Date from '$lib/components/Date.svelte';
	import { t } from '$lib/translations';
	import { findDownloadUrl } from '$lib/asset/asset.helper';

	export let asset: Asset;
</script>

<details>
	<!-- Precise positioning -->
	<summary
		class="cursor-pointer text-gray-600 dark:text-gray-500 leading-relaxed mb-4 ml-2 hover:underline"
	>
		{$t('Version history')}
	</summary>
	<table class="w-full shadow rounded text-sm bg-white dark:bg-gray-800">
		<thead>
			<tr class="font-bold">
				<td class="border px-3 py-1 text-right">{$t('Version')}</td>
				<td class="border px-3 py-1">{$t('Released')}</td>
				<td class="border px-3 py-1">{$t('Compatible with')}</td>
			</tr>
		</thead>
		<tbody>
			{#each asset.versions as version}
				<tr>
					<td class="border px-3 py-1 text-right">
						<a href={findDownloadUrl(asset, version)} class="link">
							{version.version_string}
						</a>
					</td>
					<td class="border px-3 py-1">
						<Date date={version.created_at} />
					</td>
					<td class="border px-3 py-1">Godot {version.godot_version}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</details>
