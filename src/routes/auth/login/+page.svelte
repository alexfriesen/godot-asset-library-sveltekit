<script>
	import Button from '$lib/components/Button.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import { t } from '$lib/translations';
</script>

<div class="container">
	<FormGroup class="w-full max-w-xs mx-auto mt-8 bg-white dark:bg-gray-800 rounded shadow p-4">
		<h2 class="text-center text-xl font-medium">{$t('Login')}</h2>

		<FormInput
			name="email"
			label={$t('Email address')}
			placeholder={$t('user@example.com')}
			autocomplete="email"
			required={true}
		/>

		<FormInput
			type="password"
			name="password"
			label={$t('Password')}
			placeholder={$t('Password')}
			autocomplete="password"
			required={true}
		/>
		<p>
			<a href="/auth/password" class="block link mb-2">
				{$t('Forgot your password?')}
			</a>
		</p>

		<Button type="submit" color="primary" class="w-full">{$t('Login')}</Button>
	</FormGroup>
</div>
