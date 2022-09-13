<script lang="ts">
	let className = '';
	export { className as class };

	export let open = false;
</script>

<input id="burger-button-toggle" hidden type="checkbox" bind:checked={open} />
<button class="button {className}">
	<label for="burger-button-toggle">
		<span class="menu-line menu-line-top" />
		<span class="menu-line menu-line-center" />
		<span class="menu-line menu-line-bottom" />
	</label>
</button>

<style lang="postcss">
	.button {
		@apply flex items-center space-x-2 focus:outline-none cursor-pointer;
	}
	.button label {
		@apply w-6 h-6 flex items-center justify-center relative cursor-pointer;
	}

	.menu-line {
		@apply transform transition w-full h-0.5 bg-current absolute;
	}

	.menu-line-top {
		@apply -translate-y-2;
	}
	#burger-button-toggle:checked + .button .menu-line.menu-line-top {
		@apply translate-y-0 rotate-45;
	}

	.menu-line-center {
		@apply opacity-100;
	}
	#burger-button-toggle:checked + .button .menu-line.menu-line-center {
		@apply opacity-0 translate-x-3;
	}

	.menu-line-bottom {
		@apply translate-y-2;
	}
	#burger-button-toggle:checked + .button .menu-line.menu-line-bottom {
		@apply translate-y-0 -rotate-45;
	}
</style>
