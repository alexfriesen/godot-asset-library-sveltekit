<script>
	import Button from '$lib/components/Button.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
</script>

<div class="container">
	<FormGroup
		path=""
		class="w-full max-w-xs mx-auto mt-8 bg-white dark:bg-gray-800 rounded shadow p-4"
	>
		<h2 class="text-center text-xl font-medium">Register</h2>

		<FormInput label="Username" name="username" autocomplete="username" />

		<FormInput label="Email" name="email" autocomplete="email" />

		<FormInput label="Password" type="password" name="password" />

		<Button type="submit" color="primary" class="w-full">Register</Button>
	</FormGroup>
</div>
