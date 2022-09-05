<script lang="ts">
	import type { Asset, AssetReview } from '@prisma/client';

	import { enhance } from '$lib/form';
	import { t } from '$lib/translations';
	import Button from '../components/Button.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import FormSelect from '$lib/components/FormSelect.svelte';
	import { getIssuesUrl } from './issues';

	export let asset: Asset;
	export let review: AssetReview | undefined = undefined;
	export let editing = false;

	const getFormAction = (asset: Asset, review?: AssetReview) => {
		// no review, so create a new one
		if (!review) {
			return `/asset/${asset.asset_id}/review`;
		}
		// update existing review
		return `/asset/review/${review.id}?_method=put`;
	};
</script>

<form method="post" action={getFormAction(asset, review)} use:enhance>
	<FormSelect
		name="is_positive"
		label={$t('Your rating')}
		placeholder={$t('Select a rating')}
		required={true}
	>
		<option value="1">{$t('Recommended')}</option>
		<option value="0">{$t('Not recommended')}</option>
	</FormSelect>

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
			<a class="link" href={getIssuesUrl(asset)} target="_blank" rel="nofollow noopener noreferrer">
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
</form>
