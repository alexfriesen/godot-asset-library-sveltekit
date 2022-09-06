<script lang="ts">
	import FormError from './FormError.svelte';
	import FormLabel from './FormLabel.svelte';
	import { errors } from '$lib/form';

	let className = '';
	export { className as class };
	export let name: string;
	export let value: any = undefined;

	export let type = 'text';
	export let required = false;
	export let disabled = false;
	export let placeholder = '';
	export let minlength = 0;
	export let maxlength = 10000;
	export let autofocus = false;
	export let autocomplete: boolean | string = false;
	export let label = '';
	export let title: string | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let wrapperClass = 'mb-6';

	let getAutoPattern = () => {
		if (pattern) return pattern;
		switch (type) {
			case 'email':
				return '[^@s]+@[^@s]+.[^@s]+';
		}
	};
	let computedPattern = pattern || getAutoPattern();
</script>

<div class={wrapperClass}>
	{#if label}
		<FormLabel {name} {required}>
			{label}
			<slot name="suffix" />
		</FormLabel>
	{/if}

	<svelte:element
		this={type === 'textarea' ? 'textarea' : 'input'}
		id={name}
		{name}
		{type}
		{required}
		{disabled}
		{autofocus}
		{value}
		{minlength}
		{maxlength}
		{placeholder}
		{title}
		pattern={computedPattern}
		autocomplete={autocomplete === true ? 'on' : autocomplete || 'off'}
		class="form-input-text {className}"
	/>

	{#if $errors && $errors?.path === name}
		{#each $errors.errors as error}
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
	.form-input-text {
		@apply appearance-none shadow border rounded w-full py-2 px-3 leading-relaxed text-sm;
	}

	.form-input-text:focus {
		@apply outline-none ring;
	}

	.form-input-text::placeholder {
		@apply text-gray-700;
	}

	.form-input-text:disabled {
		@apply text-gray-700 cursor-not-allowed;
	}

	.form-error {
		@apply mt-2 text-sm text-red-600;
	}

	@screen dark {
		.form-input-text {
			@apply bg-gray-800 text-gray-400;
		}

		.form-input-text::placeholder {
			@apply text-gray-500;
		}

		.form-error {
			@apply text-red-400;
		}
	}
</style>
