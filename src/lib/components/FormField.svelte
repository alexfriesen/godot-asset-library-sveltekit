<script lang="ts">
	import FormError from './FormError.svelte';
	import FormLabel from './FormLabel.svelte';
	import { errors } from '$lib/form';

	let className = 'mb-6';
	export { className as class };
	export let name: string;

	export let required = false;
	export let label = '';
</script>

<div class={className}>
	{#if label}
		<FormLabel {name} {required}>
			{label}
		</FormLabel>
	{/if}

	<slot />

	{#if $errors && Array.isArray($errors?.[name])}
		{#each $errors?.[name] as error}
			<FormError>{error}</FormError>
		{/each}
	{/if}
	{#if $$slots.error}
		<FormError>
			<slot name="error" />
		</FormError>
	{/if}

	{#if $$slots.hint}
		<div class="mt-2 text-sm text-gray-600">
			<slot name="hint" />
		</div>
	{/if}
</div>
