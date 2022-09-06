<div role="alert" class="form-error">
	<slot />
</div>

<style lang="postcss">
	.form-error {
		@apply mt-2 text-sm text-red-600;
	}

	@screen dark {
		.form-error {
			@apply text-red-400;
		}
	}
</style>
