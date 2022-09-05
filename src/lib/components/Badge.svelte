<script lang="ts">
	let className = '';
	export { className as class };
</script>

<span class="tag {className}">
	<slot />
</span>

<style lang="postcss">
	.tag {
		@apply inline-block my-1 px-3 py-1 rounded-full bg-gray-300;
	}

	/* Clickable tag (typically on asset detail pages) */
	.tag-link {
		--tag-background-color: hsl(201deg, 100%, 96%);
		--tag-background-color-hover: hsl(201deg, 100%, 92%);
		--tag-background-color-active: hsl(201deg, 100%, 88%);

		@apply text-blue-600;

		background-color: var(--tag-background-color);
	}

	.tag-link:hover {
		background-color: var(--tag-background-color-hover);
	}

	.tag-link:active {
		background-color: var(--tag-background-color-active);
	}

	@screen dark {
		.tag-link {
			--tag-background-color: theme('colors.blue.900');
			--tag-background-color-hover: theme('colors.blue.800');
			--tag-background-color-active: theme('colors.blue.1000');

			@apply text-blue-200;
		}
	}
</style>
