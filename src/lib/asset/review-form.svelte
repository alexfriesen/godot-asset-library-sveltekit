<script lang="ts">
	import type { Asset, AssetReview } from '@prisma/client';

	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/Button.svelte';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';
	import { findAssetIssuesUrl } from './asset.helper';
	import { t } from '$lib/translations';

	export let asset: Asset;
	export let review: AssetReview | undefined = undefined;
	export let editing = false;
</script>

<FormGroup path={`/asset/${asset?.asset_id}`} action={review ? 'updateReview' : 'addReview'}>
	{#if review?.id}
		<input hidden name="id" value={review.id} />
	{/if}

	<FormField name="is_positive" label={$t('Your rating')} required={true}>
		<ButtonGroup>
			<Button type="label" color="secondary">
				<input hidden type="radio" name="is_positive" value="1" />
				<Icon type="thumbs-up" />
				{$t('Recommended')}
			</Button>
			<Button type="label" color="secondary">
				<input hidden type="radio" name="is_positive" value="0" />
				<Icon type="thumbs-down" />
				{$t('Not recommended')}
			</Button>
		</ButtonGroup>
	</FormField>

	<FormInput
		type="textarea"
		name="comment"
		label={$t('Comment')}
		placeholder={$t(
			'Optional. If you leave a comment, it will be displayed in the list of reviews.'
		)}
		maxlength={2000}
		autocomplete={false}
		class="h-32"
	>
		<div slot="hint" class="mt-2 text-sm text-gray-600">
			{$t('Supports')}
			<a
				class="link"
				href="https://guides.github.com/features/mastering-markdown/"
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				GitHub Flavored Markdown
			</a>.
			{$t('Please follow the')}
			<a
				class="link"
				href="https://godotengine.org/code-of-conduct"
				target="_blank"
				rel="nofollow noopener noreferrer">{$t('Code of Conduct')}</a
			>
			{$t('when writing your review.')}<br />
			{$t("Don't use this form for support requests. Instead, report issues with the asset")}
			<a
				class="link"
				href={findAssetIssuesUrl(asset)}
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				{$t('here')}
			</a>.
		</div>
	</FormInput>

	<Button color="primary" class="mt-4" type="submit" data-loading>
		{editing ? $t('Update review') : $t('Submit review')}
	</Button>

	{#if editing}
		<Button type="button" class="mt-4 text-gray-600 dark:text-gray-500" data-review-edit-cancel>
			{$t('Cancel')}
		</Button>
	{/if}
</FormGroup>
