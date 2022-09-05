<script lang="ts">
	import Badge from '../components/Badge.svelte';

	let className = '';
	export { className as class };
	export let href: string | undefined = undefined;
</script>

<a {href}>
	<Badge class="tag tag-link {className}">
		<slot />
	</Badge>
</a>
