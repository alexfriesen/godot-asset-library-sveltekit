<script lang="ts">
	import { getContext } from 'svelte';

	export let color: 'primary' | 'secondary' | 'success' | 'none' = 'none';
	export let size: 'regular' | 'sm' = 'regular';
	export let href: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'label' = 'button';
	export let rel: string | undefined = undefined;

	const group = getContext('group');

	let element = 'button';
	if (!!href) element = 'a';
	if (type === 'label') element = 'label';
</script>

<svelte:element
	this={element}
	on:click
	class="button {group ? 'grouped' : ''} {$$props.class}"
	class:primary={color === 'primary'}
	class:secondary={color === 'secondary'}
	class:success={color === 'success'}
	class:sm={size === 'sm'}
	{rel}
	{href}
	{type}
>
	<slot />
</svelte:element>

<style lang="postcss">
	.button {
		@apply inline-block px-4 py-2 rounded cursor-pointer;
	}

	.button:hover {
		background-color: var(--hover-overlay);
	}

	.button:active {
		background-color: var(--active-overlay);
	}

	/* A compact button for use in lists where space is precious. */
	.sm {
		@apply px-3 py-1 !important;
	}

	.primary {
		@apply bg-blue-500 text-white;
	}
	.primary:hover {
		@apply bg-blue-600;
	}
	.primary:active {
		@apply bg-blue-700;
	}

	.secondary {
		@apply bg-gray-300;
	}
	.secondary:hover {
		@apply bg-gray-400;
	}
	.secondary:active {
		@apply bg-gray-500;
	}

	.success {
		@apply bg-green-500 text-white;
	}
	.success:hover {
		@apply bg-green-600;
	}
	.success:active {
		@apply bg-green-700;
	}

	.grouped {
		@apply rounded-none first:rounded-l-md last:rounded-r-md;
	}
	.grouped:has(input[type='radio']:checked) {
		background-color: hsl(220, 100%, 62.5%);
		color: white;
	}

	.login-github {
		@apply text-white;

		background-color: hsl(210deg, 12%, 28%);
	}
	.login-github:hover {
		background-color: hsl(210deg, 12%, 22%);
	}
	.login-github:active {
		background-color: hsl(210deg, 12%, 16%);
	}

	.login-gitlab {
		@apply text-white;

		background-color: hsl(19deg, 84%, 56%);
	}

	.login-gitlab:hover {
		background-color: hsl(19deg, 84%, 48%);
	}

	.login-gitlab:active {
		background-color: hsl(19deg, 84%, 40%);
	}

	/*
 * Applied in JavaScript when a long operation will be done when pressing
 * the button (such as logging in).
 */
	.button-loading {
		@apply opacity-50 pointer-events-none;
	}

	@screen dark {
		.primary {
			@apply bg-blue-600;
		}
		.primary:hover {
			@apply bg-blue-500;
		}
		.primary:active {
			@apply bg-blue-700;
		}

		.secondary {
			@apply bg-gray-700;
		}
		.secondary:hover {
			@apply bg-gray-600;
		}
		.secondary:active {
			@apply bg-gray-800;
		}

		.success {
			@apply bg-green-600;
		}
		.success:hover {
			@apply bg-green-500;
		}
		.success:active {
			@apply bg-green-700;
		}
	}
</style>
