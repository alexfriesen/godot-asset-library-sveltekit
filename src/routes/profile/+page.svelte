<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';

	import { t } from '$lib/translations';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<FormGroup path="/profile" action="update" >
		<div class="text-center text-xl font-medium">
			{$t('Edit profile')}
		</div>

		<section class="w-full max-w-xs mx-auto mt-8 bg-white dark:bg-gray-800 rounded shadow p-4">
			<FormInput
				name="username"
				value={data.currentUser?.username || null}
				label={$t('Username')}
				placeholder={$t('Username')}
				required={true}
				autofocus={true}
				maxlength={20}
				autocomplete="username"
				pattern="^[a-zA-Z][a-zA-Z0-9-_]+$"
			>
				<div slot="hint">
					{$t(
						'Can only contain alphanumeric characters, underscores and dashes. Must not begin with a number, underscore or dash.'
					)}
				</div>
			</FormInput>

			<FormInput
				name="full_name"
				value={data.currentUser?.full_name || null}
				label={$t('Full name')}
				placeholder={$t('Full name')}
				maxlength={30}
			/>

			<FormInput
				type="email"
				name="email"
				value={data.currentUser?.email || null}
				label={$t('Email address')}
				placeholder={$t('Email address')}
				disabled={true}
			>
				<div slot="hint">
					{$t('Changing your email address is not implemented yet. Sorry!')}
				</div>
			</FormInput>

			<Button color="primary" class="w-full" type="submit" data-loading>
				{$t('Save changes')}
			</Button>
		</section>
	</FormGroup>
</div>
