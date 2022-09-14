<script lang="ts">
	export let type: string;
</script>

<span aria-hidden="true" focusable="false" class="fa fa-{type} {$$props.class}">
	<slot />
</span>
