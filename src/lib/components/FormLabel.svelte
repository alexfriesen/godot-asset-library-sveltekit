<script lang="ts">
	export let name: string;

	export let required = false;
</script>

<label for={name} class="form-label {required ? 'form-required' : ''}">
	<slot />
</label>

<style lang="postcss">
	.form-label {
		@apply block text-sm font-bold mb-2;
	}

	.form-required::after {
		@apply text-red-600 ml-1;

		content: '*';
	}
</style>
