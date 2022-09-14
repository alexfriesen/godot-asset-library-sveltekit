<script lang="ts">
	import { setContext } from 'svelte';

	setContext('group', true);
</script>

<div {...$$restProps} class="inline-flex rounded-lg shadow-sm w-fit {$$props.class}" role="group">
	<slot />
</div>
