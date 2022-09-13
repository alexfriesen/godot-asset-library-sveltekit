<script lang="ts">
	import Date from '$lib/components/Date.svelte';
	import { t } from '$lib/translations';

	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user;
	$: reviews = data.reviews;
</script>

<div class="container px-0 sm:px-2">
	<h1 class="text-center text-2xl font-medium mb-8">
		{$t("{{user}}'s reviews", { user: user.username })}
	</h1>

	{#if reviews.length > 0}
		<table class="w-full lg:w-3/4 xl:w-2/3 mx-auto shadow rounded text-sm">
			<thead>
				<tr class="font-bold">
					<td class="bg-white border dark:bg-gray-800 px-3 py-1 text-right">{$t('Date')}</td>
					<td class="bg-white border dark:bg-gray-800 px-3 py-1">{$t('Asset')}</td>
					<td class="bg-white border dark:bg-gray-800 px-3 py-1">{$t('Review')}</td>
				</tr>
			</thead>
			<tbody>
				{#each reviews as review}
					<tr class="bg-white dark:bg-gray-800">
						<td class="border px-3 py-1 text-right">
							<Date date={review.created_at} />
						</td>

						<td class="border px-3 py-1">
							<a href="/asset/{review.asset.asset_id}" class="link">
								{review.asset.title}
							</a>
						</td>

						<td class="border px-3 py-1">
							{#if review.is_positive}
								<span class="font-bold text-blue-500 dark:text-blue-400">
									<span class="-ml-1 fa fa-chevron-circle-up fa-fw opacity-75" />
									{$t('Recommended')}
								</span>
							{:else}
								<span class="font-bold text-red-700 dark:text-red-600">
									<span class="-ml-1 fa fa-chevron-circle-down fa-fw opacity-75" />
									{$t('Not recommended')}
								</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<div class="mt-8 text-lg text-center text-gray-600">
			{$t("This user hasn't posted any reviews yet.")}
		</div>
	{/if}
</div>
