<script lang="ts">
	import type { Asset, User } from '@prisma/client';
	import { isEqual } from 'date-fns';

	import { t } from '$lib/translations';
	import { canEditReview, canSubmitReview, canSubmitReviewReply } from '$lib/permissions';
	import { getPositiveReviews, isOwnReview } from './review';
	import { getScoreColor } from './score';
	import FormGroup from '$lib/components/FormGroup.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import AssetReviewForm from './review-form.svelte';
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Date from '$lib/components/Date.svelte';

	export let asset: Asset;
	export let user: User;
</script>

<section>
	{#if canSubmitReview(user, asset)}
		<hr class="my-6" />
		<h2 class="text-xl font-medium mb-8">
			{$t('Leave a review')}
		</h2>
		<AssetReviewForm {asset} editing={false} />
	{:else if !user}
		<hr class="my-6" />
		<a class="link" href="/auth/login">
			{$t('Please log in to submit a review.')}
		</a>
	{/if}

	<hr class="my-8" />
	<h2 class="text-xl font-medium mb-8">
		{$t('default.asset.reviews.count', {
			count: asset.reviews?.length || 0
		})}
		<span
			aria-label="score"
			class="ml-3 pl-5 border-l border-gray-400 {getScoreColor(asset)} dark:text-gray-400"
		>
			<Icon type={asset.score >= 0 ? 'thumbs-up' : 'thumbs-down'} class="mr-1 opacity-50" />
			{asset.score}
		</span>

		<span class="ml-16 text-sm text-blue-500">
			<Icon type="chevron-circle-up" class="fa-fw opacity-75" />
			{getPositiveReviews(asset).length}
		</span>
		<span class="ml-4 text-sm text-red-700">
			<Icon type="chevron-circle-down" class="fa-fw opacity-75" />
			<!-- Infer the number of negative reviews based on the total number of reviews -->
			{asset.reviews.length - getPositiveReviews(asset).length}
		</span>
	</h2>

	{#each asset.reviews as review}
		{#if review.comment || isOwnReview(user, review)}
			<!-- Highlight the review posted by the current user -->
			<article
				class="relative review px-4 md:px-6 pt-4 pb-5 my-4 rounded shadow md:w-3/4 xl:w-3/5 @if ($isOwnReview) bg-blue-100 dark:bg-blue-1000 @else bg-white dark:bg-gray-800 @endif"
			>
				{#if canEditReview(user, review)}
					<!-- Remove spacing between items -->
					<div class="absolute top-0 right-0 mr-2 mt-2" style="font-size: 0">
						<Button type="button" class="text-base cursor-pointer" data-review-edit>
							<Icon type="pencil" class="opacity-50" />
						</Button>
						<FormGroup path={`/asset/review/${review.id}`} action="delete" class="inline-block">
							<Button type="submit" class="text-base cursor-pointer">
								<Icon type="times" class="opacity-50" />
							</Button>
						</FormGroup>
					</div>
				{/if}
				<div class="text-gray-600 dark:text-gray-500 mb-6">
					{#if review.is_positive}
						<span class="font-bold text-blue-500 dark:text-blue-400">
							<Icon type="chevron-circle-up" class="fa-fw opacity-75" />
							{$t('Recommended')}
						</span>
					{:else}
						<span class="font-bold text-red-700 dark:text-red-600">
							<Icon type="chevron-circle-down" class="fa-fw opacity-75" />
							{$t('Not recommended')}
						</span>
					{/if}

					<span class="hidden md:inline">—</span>
					<div class="ml-6 md:ml-0 md:inline">
						<a href={`/user/${review.author.id}`} class="link">{review.author.username}</a>
						{$t('commented')}
						<Date date={review.created_at} />
						{#if !isEqual(review.updated_at, review.created_at)}
							<div class="md:inline md:ml-2 text-sm opacity-75">
								({$t('edited')}
								<Date date={review.updated_at} />)
							</div>
						{/if}
					</div>
				</div>
				<div class="content text-gray-700 dark:text-gray-400" data-review-comment>
					{#if review.html_comment}
						{@html review.html_comment}
					{:else}
						<span class="opacity-50 italic">
							{$t('No comment attached. (Only you can see this notice.)')}
						</span>
					{/if}
				</div>

				{#if canEditReview(user, review)}
					<div class="hidden" data-review-edit-form>
						<AssetReviewForm editing={true} {asset} {review} />
					</div>
				{/if}

				{#if review.reply}
					<div
						class="content px-4 py-3 mt-6 md:ml-8 bg-gray-300 dark:bg-gray-700 rounded relative text-sm"
					>
						<div class="absolute border-gray-300 dark:border-gray-700 top-0 -mt-6 arrow-up" />
						<div class="font-bold text-gray-600 dark:text-gray-300 mb-1">
							{$t('Reply from {{username}}', { username: asset.author?.username })}
							<span class="ml-4 opacity-75">
								<Date date={review.reply.created_at} />
							</span>
							{#if !isEqual(review.reply.updated_at, review.reply.created_at)}
								<div class="md:inline md:ml-2 text-sm opacity-75">
									({$t('edited')}
									<Date date={review.reply.updated_at} />)
								</div>
							{/if}
						</div>
						{@html review.reply.html_comment}
					</div>
				{:else if canSubmitReviewReply(user, asset, review)}
					<details>
						<summary class="inline-block ml-3 mt-3 px-2 py-1 link cursor-pointer">
							<Icon type="reply" class="fa-fw mr-1 opacity-75" />
							{$t('Reply')}
						</summary>

						<FormGroup path={`/asset/review/${review.id}`} action="reply" class="mt-6 ml-8">
							<FormInput
								type="textarea"
								name="comment"
								label={$t('Reply')}
								placeholder={$t('Your reply to the comment above…')}
								required={true}
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
										rel="nofollow noopener noreferrer"
									>
										{$t('Code of Conduct')}
									</a>
									{$t('when writing your reply.')}
								</div>
							</FormInput>
							<Button color="primary" class="mt-6" type="submit" data-loading>
								{$t('Submit reply')}
							</Button>
						</FormGroup>
					</details>
				{/if}
			</article>
		{/if}
	{/each}
	{#if !asset.reviews.length && canSubmitReview(user, asset)}
		<div class="my-6 text-gray-600">
			{$t('No reviews yet. Be the first to leave a review!')}
		</div>
	{/if}
</section>

<style lang="postcss">
	.arrow-up {
		border-width: 0.75rem;
		border-top-color: transparent !important;
		border-left-color: transparent !important;
		border-right-color: transparent !important;
	}
</style>
