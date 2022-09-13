<script>
	import Button from '$lib/components/Button.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import { t } from '$lib/translations';
</script>

<div class="container">
	<FormGroup class="w-full max-w-xs mx-auto mt-8 bg-white dark:bg-gray-800 rounded shadow p-4">
		<h2 class="text-center text-xl font-medium">{$t('Sign up')}</h2>

		<FormInput
			name="username"
			label={$t('Username')}
			placeholder={$t('Username')}
			autocomplete="username"
			required={true}
		>
			<div slot="hint">
				{$t(
					'Can only contain alphanumeric characters, underscores and dashes. Must not begin with a number, underscore or dash.'
				)}
			</div>
		</FormInput>

		<FormInput
			name="email"
			label={$t('Email address')}
			placeholder={$t('user@example.com')}
			autocomplete="email"
			required={true}
		>
			<div slot="hint">
				{$t('Will not be displayed publicly.')}
			</div>
		</FormInput>

		<FormInput
			type="password"
			name="password"
			label={$t('Password')}
			placeholder={$t('Password')}
			required={true}
			minlength={10}
		>
			<div slot="hint">
				{$t('Must be at least {{length}} characters long.', { length: 10 })}
			</div>
		</FormInput>

		<Button type="submit" color="primary" class="w-full">{$t('Sign up')}</Button>
	</FormGroup>
</div>
