<script lang="ts">
	import Date from '$lib/components/Date.svelte';
	import AssetCard from '$lib/asset/card.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import { canBlockUser } from '$lib/permissions';
	import { t } from '$lib/translations';

	import type { PageData } from './$types';

	export let data: PageData;

	$: user = data.user;
	$: currentUser = data.currentUser;
</script>

<div class="container">
	<h1 class="text-center text-2xl font-medium">
		{$t("{{username}}'s profile", { username: user.username || 'na' })}
	</h1>
	<h2 class="text-center text-gray-600 mt-2 mb-2">
		{$t('Joined')}
		<Date date={user.created_at} />
		—
		{#if user.reviews.length >= 1}
			<a href={`/user/${user.id}/reviews`} class="link">
				{$t('Reviewed {{count:gt; 0:{{count:number;}} {{count; 1:asset; default:assets}}; }}', {
					count: user.reviews?.length || 0
				})}
			</a>
		{:else}
			{$t('Reviewed no assets')}
		{/if}
	</h2>

	{#if canBlockUser(currentUser, user)}
		<div class="text-center">
			<h2 class="text-center text-xl font-medium mt-8 mb-4">
				{$t('Actions')}
			</h2>
			<FormGroup path="/admin" action="user-block">
				<input hidden type="text" name="userId" value={user.id} />
				<input hidden type="checkbox" name="is_blocked" value={!user.is_blocked} checked />
				<Button type="submit" class={user.is_blocked ? '' : 'text-red-700'}>
					<Icon type={user.is_blocked ? 'circle-o' : 'ban'} class="fa-fw -ml-1 mr-1 opacity-75" />
					{user.is_blocked ? $t('Unblock') : $t('Block')}
				</Button>
			</FormGroup>
		</div>
	{/if}

	<h2 class="text-center text-xl font-medium mt-16">
		{$t('Assets by {{user}}', { user: user.username || 'na' })}
	</h2>

	{#if user.assets.length >= 1}
		<section class="grid grid-flow-row sm:grid-cols-1 lg:grid-cols-2 gap-6">
			{#each user.assets as asset}
				<AssetCard {asset} />
			{/each}
		</section>
	{:else}
		<div class="mt-8 text-lg text-center text-gray-600">
			{$t("{{username}} hasn't posted any assets yet.", { username: user.username || 'na' })}<br />
		</div>
	{/if}
</div>
