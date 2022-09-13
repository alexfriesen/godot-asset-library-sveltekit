<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { errors } from '$lib/form';

	let className = '';
	export { className as class };

	export let method: 'get' | 'post' = 'post';
	export let path: string = '';
	export let action: string | undefined = undefined;

	let actionParam = action ? `${path.includes('?') ? '&' : '?'}/${action}` : '';

	const handleResult = async ({ result }: any) => {
		if (result.type === 'invalid') {
			errors.set(result.data);
		}
		if (result.type === 'error') {
			await applyAction(result);
		}
		if (result.type === 'success') {
			await invalidateAll();
			if (result.data?.location) {
				return goto(result.data.location);
			}
		}
	};
</script>

<form class={className} {method} action={`${path}${actionParam}`} use:enhance={() => handleResult}>
	<slot errors={$errors} />
</form>
