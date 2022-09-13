<script lang="ts">
	import type { PageData } from './$types';
	import type { User } from '@prisma/client';

	import { t } from '$lib/translations';
	import { canBlockUser } from '$lib/permissions';

	import Meta from '$lib/components/Meta.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Date from '$lib/components/Date.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';

	export let data: PageData;

	const getRowClass = (user: User) => {
		if (user.id === data.currentUser.id) {
			return 'bg-blue-100 text-blue-800 dark:bg-blue-1000 dark:text-blue-200';
		} else if (user.is_blocked) {
			return 'bg-red-100 text-red-800 dark:bg-red-1000 dark:text-red-200';
		} else {
			return 'bg-white dark:bg-gray-800';
		}
	};
</script>

<Meta title="Administration panel" noindex={true} />

<div class="container">
	<h2 class="text-center text-2xl font-medium">
		{$t('Administration panel')}
	</h2>

	<!-- {--
	  We must append the query parameters so that search filters carry on
	  when the user clicks a page number
	--} -->
	<!-- { users->appends(Request::all())->links() } -->

	<div class="my-8">
		<table class="w-full xl:w-3/4 mx-auto shadow rounded text-sm">
			<thead>
				<tr class="font-bold">
					<td class="bg-white border dark:bg-gray-800 px-3 py-1 text-right">{$t('Registered')}</td>
					<td class="bg-white border dark:bg-gray-800 px-3 py-1">{$t('Name')}</td>
					<td class="bg-white border dark:bg-gray-800 px-3 py-1">{$t('Assets')}</td>
					<td class="bg-white border dark:bg-gray-800 px-3 py-1">{$t('Reviews')}</td>
					<td class="bg-white border dark:bg-gray-800 px-3 py-1">{$t('Actions')}</td>
				</tr>
			</thead><tbody>
				{#each data.users as user}
					<tr class={getRowClass(user)}>
						<td class="border px-3 py-1 text-right">
							<Date date={user.created_at} />
						</td>

						<td class="border px-3 py-1">
							<div class={user.is_admin ? 'py-1' : ''}>
								<!--
									@if (user.is_admin)
									aria-label="{ $t('Administrator') }"
									data-balloon-pos="up"
									data-balloon-blunt
									class="py-1"
									@endif
								-->

								<a class="link" href="mailto:{user.email}">
									<Icon type="envelope" class="fa-fw mr-1 opacity-75" />
								</a>
								{#if user.is_admin}
									<Icon type="shield" class="fa-fw mr-1 text-yellow-600" />
								{/if}
								<a class="link" href={`user/${user.id}`}>
									{user.username}
								</a>
							</div>
						</td>

						<td class="border px-3 py-1 @if (user.assets->count() == 0) opacity-50 @endif">
							{user.assets.length}
						</td>

						<td class="border px-3 py-1 @if (user.assetReviews->count() == 0) opacity-50 @endif">
							{user.reviews.length}
						</td>

						<td class="border px-3 py-1">
							{#if canBlockUser(data.currentUser, user)}
								<FormGroup path="/admin" action="user-block">
									<input hidden type="text" name="userId" value={user.id} />
									<input
										hidden
										type="checkbox"
										name="is_blocked"
										value={!user.is_blocked}
										checked
									/>
									<Button
										size="sm"
										color="none"
										type="submit"
										class={user.is_blocked ? '' : 'text-red-700'}
									>
										<Icon
											type={user.is_blocked ? 'circle-o' : 'ban'}
											class="fa-fw -ml-1 mr-1 opacity-75"
										/>
										{user.is_blocked ? $t('Unblock') : $t('Block')}
									</Button>
								</FormGroup>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- {--
	  We must append the query parameters so that search filters carry on
	  when the user clicks a page number
	--} -->
	<!-- { users->appends(Request::all())->links() } -->
	<!-- TODO: add pagination -->
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
