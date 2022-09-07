<script lang="ts">
	import type { AssetVersion } from '@prisma/client';
	import Icon from '$lib/components/Icon.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormSelect from '$lib/components/FormSelect.svelte';
	import { godotVersionMap } from './version';
	import { t } from '$lib/translations';

	export let version: AssetVersion | undefined = undefined;
	export let index = 0;
	let prefix = `asset_versions[${index}]`;
	let prototype = version ? true : false;
</script>

<div class="relative my-4 p-4 pb-2 bg-white dark:bg-gray-800 rounded shadow">
	<!-- {-- Only prototypes can be removed, as published versions cannot be removed --} -->
	{#if prototype}
		<button
			type="button"
			class="absolute top-0 right-0 mt-2 mr-2 opacity-50 hover:opacity-75"
			data-delete-version
		>
			<Icon type="times" class="fa-fw" />
		</button>
	{/if}

	{#if !prototype}
		<!-- {--
      Used to associate the versions on the backend to update them correctly
      (instead of removing all of them and recreating them)
    --} -->
		<input type="hidden" name={`${prefix}[id]`} value={version?.id} />
	{/if}

	<div class="sm:flex sm:justify-between">
		<FormInput
			name={`${prefix}[version_string]`}
			value={version?.version_string || null}
			label={$t('Asset version')}
			placeholder="1.0.0"
			required={true}
			autocomplete={false}
		/>

		<FormSelect
			name={`${prefix}[godot_version]`}
			label={$t('Godot version')}
			placeholder={$t('Select a Godot version')}
			required={true}
			autocomplete={false}
		>
			{#each godotVersionMap as godotVersion}
				<option value={godotVersion.key} selected={version?.godot_version === godotVersion.key}>
					{godotVersion.name}
				</option>
			{/each}
		</FormSelect>
	</div>

	<FormInput
		type="url"
		name={`${prefix}[download_url]`}
		value={version?.download_url || null}
		label={$t('Custom download URL')}
		placeholder="https:github.com/user/asset/archive/v1.0.0.zip"
		maxlength={2000}
		autocomplete={false}
	/>
</div>
