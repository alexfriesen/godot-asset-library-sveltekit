<script lang="ts">
	import type { AssetPreview } from '@prisma/client';
	import Icon from '$lib/components/Icon.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import { t } from '$lib/translations';

	export let preview: AssetPreview | undefined = undefined;
	export let index = 0;
	let prefix = `asset_previews[${index}]`;
	let prototype = preview ? true : false;
</script>

<div class="relative my-4 p-4 pb-2 bg-white dark:bg-gray-800 rounded shadow">
	<!-- {-- Only prototypes can be removed, as published previews cannot be removed yet --} -->
	{#if prototype}
		<button
			type="button"
			class="absolute top-0 right-0 mt-2 mr-2 opacity-50 hover:opacity-75"
			data-delete-preview
		>
			<Icon type="times" class="fa-fw" />
		</button>
	{/if}

	{#if !prototype}
		<!-- {--
      Used to associate the previews on the backend to update them correctly
      (instead of removing all of them and recreating them)
    --} -->
		<input type="hidden" name={`${prefix}[id]`} value={preview?.preview_id} />
	{/if}

	<!-- // {-- TODO: Allow adding video previews --} -->
	<input type="hidden" name="previews[{index}][type_id]" value="0" />

	<FormInput
		type="url"
		name={`${prefix}[link]`}
		value={preview?.link || null}
		label={$t('Preview URL')}
		required={true}
		maxlength={2000}
		autocomplete={false}
	>
		<div slot="hint">
			{$t('For images, a 16:9 aspect ratio is recommended.')}
			{$t('Only PNG or JPEG images are allowed.')}
		</div>
	</FormInput>
	<!-- @endcomponent -->

	<FormInput
		type="url"
		name={`${prefix}[thumbnail]`}
		value={preview?.thumbnail || null}
		label={$t('Thumbnail URL')}
		maxlength={2000}
		autocomplete={false}
	>
		<div slot="hint">
			{$t('If present, the thumbnail should have the same aspect ratio as the preview.')}
			{$t('Only PNG or JPEG images are allowed.')}
		</div>
	</FormInput>

	<FormInput
		name={`${prefix}[caption]`}
		value={preview?.caption || null}
		label={$t('Caption')}
		placeholder={$t('A short sentence to accompany the image')}
		maxlength={60}
		autocomplete={false}
	/>
</div>
