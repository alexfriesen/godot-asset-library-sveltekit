<script lang="ts">
	import { errors, enhance } from '$lib/form';

	export let method: 'get' | 'post' | 'patch' | 'delete' = 'post';
	export let action: string;

	let methodOverride = ['get', 'post'].includes(method)
		? method
		: `${action.includes('?') ? '&' : '?'}_method=${method}`;

	const onError = ({ error }: any) => {
		errors.set(error);
	};
</script>

<form
	method={method === 'get' ? method : 'post'}
	action={`${action}${methodOverride}`}
	use:enhance={{ error: onError }}
>
	<slot errors={$errors} />
</form>
