<script lang="ts">
	import Date from '$lib/components/Date.svelte';
	import AssetCard from '$lib/asset/card.svelte';
	import { canBlockUser } from '$lib/permissions';
	import { t } from '$lib/translations';

	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">

	<h1 class="text-center text-2xl font-medium">
		{$t("{{user}}'s profile", { user: data.user.username })}
	</h1>
	<h2 class="text-center text-gray-600 mt-2 mb-2">
		{$t('Joined')}
		<Date date={data.user.created_at} />
		—
		{#if data.user.reviews.length >= 1}
			<a href={`/user/${data.user.id}/reviews`} class="link">
				{$t('Reviewed {{count:gt; 0:{{count:number;}} {{count; 1:asset; default:assets}}; }}', {
					count: data.user.reviews.length
				})}
			</a>
		{:else}
			{$t('Reviewed no assets')}
		{/if}
	</h2>

	{#if canBlockUser(data.currentUser, data.user)}
		<div class="text-center">
			<h2 class="text-center text-xl font-medium mt-8 mb-4">
				{$t('Actions')}
			</h2>
			{#if data.user.is_blocked}
				<form method="post" action=" route('admin.unblock', ['user' => data.user]) ">
					<!-- @csrf -->
					<!-- @method('PUT') -->
					<button type="submit" class="button">
						<span class="fa fa-circle-o fa-fw -ml-1 mr-1 opacity-75" />
						{$t('Unblock')}
					</button>
				</form>
			{:else}
				<form method="post" action=" route('admin.block', ['user' => data.user]) ">
					<!-- @csrf -->
					<!-- @method('PUT') -->
					<button type="submit" class="button text-red-700">
						<span class="fa fa-ban fa-fw -ml-1 mr-1 opacity-75" />
						{$t('Block')}
					</button>
				</form>
			{/if}
		</div>
	{/if}

	<h2 class="text-center text-xl font-medium mt-16">
		{$t('Assets by {{user}}', { user: data.user.username })}
	</h2>

	{#if data.user.assets.length >= 1}
		<section class="grid grid-flow-row sm:grid-cols-1 lg:grid-cols-2 gap-6">
			{#each data.user.assets as asset}
				<AssetCard {asset} />
			{/each}
		</section>
	{:else}
		<div class="mt-8 text-lg text-center text-gray-600">
			{$t("{{user}} hasn't posted any assets yet.", { user: data.user.username })}<br />
		</div>
	{/if}
</div>
