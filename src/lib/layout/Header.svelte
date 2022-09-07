<script lang="ts">
	import type { User } from '@prisma/client';
	import { page } from '$app/stores';
	import { t } from '$lib/translations';
	import { canSubmitAsset } from '$lib/permissions';
	import { categoryMap } from '$lib/asset/category';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import BurgerButton from '$lib/components/BurgerButton.svelte';

	export let currentUser: User;
	export let navbarOpen = false;

	export const searchTooltip = `
Press / to focus this field.
This will search in the asset's title, blurb and tags.
This field supports search string syntax. Examples:

Hello world  —  Search for "Hello" and "world" individually
"Hello world"  —  Perform an exact match instead of matching words individually
score >= 3  —  Show assets with a score greater than or equal to 3
license = MIT  —  Show assets licensed under the MIT license (use SPDX identifiers)
updated_at > 2020-01-01  —  Show assets updated after January 1 2020
`;
</script>

<header>
	<nav class="shadow bg-white dark:bg-gray-800 p-2 mb-8">
		<div class="container px-0 flex flex-wrap justify-between">
			<div class="lg:flex items-center">
				<a
					href="/"
					class="navbar-link font-medium text-lg"
					class:active={$page.url.pathname === '/'}
				>
					Godot Asset Library
				</a>

				<div class:hidden={!navbarOpen} class="lg:flex items-center">
					<div class="relative mt-2 mb-2 lg:mt-0 lg:mb-0">
						<form
							method="GET"
							action="/asset"
							class="lg:ml-2 relative"
							aria-label={searchTooltip}
							title={searchTooltip}
							data-balloon-pos="down"
							data-balloon-break
						>
							<FormInput
								name="filter"
								placeholder={$t(`Search for assets`)}
								value={$page.url.searchParams.get('filter')}
								wrapperClass=""
								class="shadow-none bg-gray-200 dark:bg-gray-700 lg:w-64"
							/>
							<Icon
								type="search"
								class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
							/>
						</form>
					</div>

					<div class:hidden={!navbarOpen} class="hidden lg:block navbar-dropdown">
						<Button href="/" class="lg:ml-2">
							{$t(`Categories`)}
							<Icon type="angle-down" class="ml-1" />
						</Button>
						<div class="navbar-dropdown-content">
							{#each categoryMap as category}
								<Button
									href="/?category={category.key}"
									class="block rounded-none px-6 whitespace-nowrap"
								>
									<Icon type={category.icon} class="fa-fw mr-1 -ml-2 opacity-75" />
									{category.name}
								</Button>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div class="absolute top-0 right-0 lg:hidden">
				<BurgerButton class="p-4" bind:open={navbarOpen} />
			</div>

			<div class:hidden={!navbarOpen} class="w-full lg:flex lg:items-center lg:w-auto">
				{#if currentUser}
					{#if canSubmitAsset(currentUser)}
						<a href="/asset/create" class="navbar-link">
							{$t(`Submit asset`)}
						</a>
					{/if}

					<div class="navbar-dropdown">
						<Button href={`/user/${currentUser.id}`}>
							{currentUser.username}
							<Icon type="angle-down" class="ml-1" />
						</Button>
						<div class="navbar-dropdown-content lg:right-0">
							<Button href="/profile" class="block rounded-none px-6 whitespace-nowrap">
								<Icon type="cogs" class="fa-fw mr-1 -ml-2 opacity-75" />
								{$t(`Settings`)}
							</Button>
							<form method="post" action="/auth/logout">
								<!-- @csrf -->
								<Button
									class="block rounded-none px-6 whitespace-nowrap"
									type="submit"
									data-loading
								>
									<Icon type="sign-out" class="fa-fw mr-1 -ml-2 opacity-75" />
									{$t(`Log out`)}
								</Button>
							</form>
						</div>
					</div>
				{:else}
					<a href="/auth/register" class="navbar-link">
						{$t(`Sign up`)}
					</a>
					<a href="/auth/login" class="navbar-link">
						{$t(`Log in`)}
					</a>
				{/if}
			</div>
		</div>
	</nav>
</header>

<style lang="postcss">
	.navbar-link {
		@apply block rounded leading-none p-3;
	}
	.navbar-link:hover {
		background-color: var(--hover-overlay);
	}
	.navbar-link:active {
		background-color: var(--active-overlay);
	}

	.navbar-dropdown {
		position: relative;
	}
	.navbar-dropdown:hover .navbar-dropdown-content {
		@apply flex flex-col;
	}

	.navbar-dropdown-content {
		@apply hidden absolute bg-white rounded shadow;
		z-index: 1;
	}

	@screen dark {
		.navbar-dropdown-content {
			@apply bg-gray-800;
		}
	}
</style>
