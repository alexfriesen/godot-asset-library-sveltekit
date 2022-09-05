<script lang="ts">
	let className = '';
	export { className as class };

	export let type: string;
</script>

<span aria-hidden="true" focusable="false" class="fa fa-{type} {className}"><slot /></span>
