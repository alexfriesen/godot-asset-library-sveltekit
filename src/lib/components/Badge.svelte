<script lang="ts">
	let className = '';
	export { className as class };

	export let href: string | undefined = undefined;
	export let color: string | 'gray' | 'blue' | 'yellow' | 'green' | 'none' = 'none';
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class="tag {color} {className} {href ? 'link' : ''}"
>
	<slot />
</svelte:element>

<style lang="postcss">
	.tag {
		@apply inline-flex items-center px-3 py-1 rounded-full;
	}

	.gray {
		@apply bg-gray-200 dark:bg-gray-700;
	}

	.blue {
		@apply bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200;
	}

	.yellow {
		@apply bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200;
	}

	.green {
		@apply bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200;
	}

	/* Clickable tag (typically on asset detail pages) */
	.link {
		--tag-background-color: hsl(201deg, 100%, 96%);
		--tag-background-color-hover: hsl(201deg, 100%, 92%);
		--tag-background-color-active: hsl(201deg, 100%, 88%);

		@apply text-blue-600;

		background-color: var(--tag-background-color);
	}
	.link:hover {
		background-color: var(--tag-background-color-hover);
	}
	.link:active {
		background-color: var(--tag-background-color-active);
	}

	@screen dark {
		.link {
			--tag-background-color: theme('colors.blue.900');
			--tag-background-color-hover: theme('colors.blue.800');
			--tag-background-color-active: theme('colors.blue.1000');

			@apply text-blue-200;
		}
	}
</style>
