<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { errors } from '$lib/form';

	let className = '';
	export { className as class };

	export let method: 'get' | 'post' = 'post';
	export let path: string;
	export let action: string;

	let actionParam = `${path.includes('?') ? '&' : '?'}/${action}`;

	const handleResult = async ({ result }: any) => {
		if (result.type === 'invalid') {
			errors.set(result.data);
		}
		if (result.type === 'error') {
			await applyAction(result);
		}
	};
</script>

<form class={className} {method} action={`${path}${actionParam}`} use:enhance={() => handleResult}>
	<slot errors={$errors} />
</form>
