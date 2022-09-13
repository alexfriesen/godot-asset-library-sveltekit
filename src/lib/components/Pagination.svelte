<script lang="ts" context="module">
	export interface Page {
		href: string;
		index: number;
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { t } from '$lib/translations';

	let className = '';
	export { className as class };
	export let totalItems = 0;

	let currentPage: number;
	let pages: Page[] = [];
	let previousPage: string = '';
	let nextPage: string = '';

	const updatePages = () => {
		pages = [];
		nextPage = '';
		previousPage = '';

		currentPage = Number($page.url.searchParams.get('page')) || 1;
		let itemsPerPage = Number($page.url.searchParams.get('max_results')) || 40;
		let maxPageIndex = Math.ceil(totalItems / itemsPerPage);

		let rangeStart = Math.max(currentPage - 5, 1);
		let rangeEnd = Math.min(currentPage + 5, maxPageIndex);

		const url = new URL($page.url.toString());
		for (let i = rangeStart; i <= rangeEnd; i++) {
			url.searchParams.set('page', `${i}`);
			const href = url.toString();
			const item = { href, index: i };
			pages.push(item);

			if (i === currentPage - 1) {
				previousPage = href;
			}
			if (i === currentPage + 1) {
				nextPage = href;
			}
		}
	};

	updatePages();

	afterNavigate(updatePages);
</script>

<nav aria-label="Page navigation" class={className}>
	<ul class="inline-flex items-center">
		{#if previousPage}
			<li>
				<a
					href={previousPage}
					class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<span class="sr-only">{$t('Previous Page')}</span>
					&laquo;
				</a>
			</li>
		{/if}
		{#each pages as page}
			<li>
				<a
					href={page.href}
					class="block py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					class:active={currentPage === page.index}
				>
					{page.index}
				</a>
			</li>
		{/each}
		{#if nextPage}
			<li>
				<a
					href={nextPage}
					class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<span class="sr-only">{$t('Next Page')}</span>
					&raquo;
				</a>
			</li>
		{/if}
	</ul>
</nav>

<style lang="postcss">
	.active {
		background-color: hsl(220, 100%, 62.5%);
		color: white;
	}
</style>
