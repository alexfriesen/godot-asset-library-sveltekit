<script lang="ts">
	import { enhance } from '$app/forms';
	import { errors } from '$lib/form';

	export let method: 'get' | 'post' = 'post';
	export let path: string;
	export let action: string;

	let actionParam = `${path.includes('?') ? '&' : '?'}/${action}`;

	const onError = ({ error }: any) => {
		errors.set(error);
	};
</script>

<form
	{method}
	action={`${path}${actionParam}`}
	use:enhance={() => {
		return async (result) => {
			if (result.type === 'invalid') {
				errors.set(result.data);
			}
		};
	}}
>
	<slot errors={$errors} />
</form>
