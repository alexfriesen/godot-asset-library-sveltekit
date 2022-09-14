<script lang="ts">
	import FormLabel from './FormLabel.svelte';
	import FormError from './FormError.svelte';
	import { errors } from '$lib/form';

	let className = '';
	export { className as class };

	export let name: string;
	export let required = false;
	export let disabled = false;
	export let placeholder = '';
	export let label = '';
	export let value: any = undefined;
	export let items: { name: string; value: string }[] = [];
</script>

<div class="mb-6">
	{#if label}
		<FormLabel {name} {required}>
			{label}
		</FormLabel>
	{/if}

	<div class="inline-block relative">
		<select
			on:change
			on:input
			bind:value
			id={name}
			{disabled}
			{required}
			{name}
			class="select {className}"
		>
			{#if placeholder}
				<option disabled>
					{placeholder}
				</option>
			{/if}
			{#each items as item}
				<option value={item.value} selected={item.value === value}>{item.name}</option>
			{/each}
			<slot />
		</select>

		<div
			class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
		>
			<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
				<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
			</svg>
		</div>
	</div>

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

<style lang="postcss">
	.select {
		@apply block appearance-none w-full bg-white dark:bg-gray-800 shadow border rounded px-3 py-2 pr-8 leading-relaxed text-sm hover:border-gray-500 focus:outline-none focus:ring;
	}
</style>
