<script lang="ts">
	import type { Asset } from '@prisma/client';

	import Icon from '$lib/components/Icon.svelte';
	import { t } from '$lib/translations';
	import { onMount } from 'svelte';
	import { isBetween } from '$lib/utils';

	export let asset: Asset;

	let slidesContainer: HTMLElement;
	let slidesList: HTMLElement;
	let thumbnailContainer: HTMLElement;
	let thumbnailList: HTMLElement;
	let containerWidth: number;
	let scrolledLeft = 0;
	let currentIndex = 0;
	let showPreviousButton = false;
	let showNextButton = true;

	const onScroll = (event: Event) => {
		scrolledLeft = (event.target as HTMLElement)?.scrollLeft || 0;
		const newIndex = findCurrentIndex(scrolledLeft);

		if (newIndex && newIndex !== currentIndex) {
			currentIndex = newIndex;
			updateThumbnail();
			updateButtons();
		}
	};
	const scrollToIndex = (index: number) => {
		const slide = slidesList.querySelector<HTMLElement>(`[data-index="${index}"]`);
		slidesContainer.scrollLeft = slide?.offsetLeft || 0;
	};
	const updateButtons = () => {
		const slidesWidth = slidesList.scrollWidth;
		showPreviousButton = scrolledLeft > containerWidth;
		showNextButton = scrolledLeft < slidesWidth - containerWidth;
	};
	const updateThumbnail = () => {
		const thumbnail = thumbnailList.querySelector<HTMLElement>(`[data-index="${currentIndex}"]`);
		// keep current thumbnail centered
		thumbnailContainer.scrollLeft = (thumbnail?.offsetLeft || 0) - containerWidth / 2;
	};
	const onThumbnailClick = (event: MouseEvent) => {
		const index = Number((event.target as HTMLElement)?.parentElement?.dataset.index || 0);
		scrollToIndex(index);
	};
	const findCurrentIndex = (scrollLeft: number) => {
		for (const child of Array.from(<HTMLCollectionOf<HTMLElement>>slidesList.children)) {
			if (isBetween(scrollLeft, child.offsetLeft, child.offsetLeft + containerWidth)) {
				return Number(child.dataset.index);
			}
		}
	};

	const onNext = () => {
		scrollToIndex(currentIndex + 1);
	};
	const onPrevious = () => {
		scrollToIndex(currentIndex - 1);
	};

	onMount(() => {
		slidesContainer.scrollLeft = 0;
		thumbnailContainer.scrollLeft = 0;
		updateButtons();
	});

	$: previews = asset.previews;
</script>

<div class="slider">
	<div
		class="scroll-container scrollbar-hide"
		role="region"
		aria-label="Image slider"
		tabindex="0"
		bind:this={slidesContainer}
		bind:clientWidth={containerWidth}
		on:scroll={onScroll}
	>
		<ol class="track" role="list" bind:this={slidesList}>
			{#each previews as preview, index}
				<li class="item" data-index={index}>
					<img
						src={preview.link}
						alt={preview.caption}
						loading={index === 0 ? 'lazy' : 'eager'}
						decoding="async"
					/>
				</li>
			{/each}
		</ol>
	</div>
	<ol role="list" class="controls" aria-label="Navigation controls">
		<li>
			<button
				class="control start"
				disabled={!showPreviousButton}
				aria-disabled={!showPreviousButton}
				aria-label={$t('Previous')}
				on:click={onPrevious}
			>
				<Icon type="arrow-left" />
			</button>
		</li>
		<li>
			<button
				class="control end"
				disabled={!showNextButton}
				aria-disabled={!showNextButton}
				aria-label={$t('Next')}
				on:click={onNext}
			>
				<Icon type="arrow-right" />
			</button>
		</li>
	</ol>
</div>
<div
	class="scroll-container thumbnail"
	role="tablist"
	aria-label="slider Thumbnails"
	tabindex="0"
	bind:this={thumbnailContainer}
>
	<ol class="track" role="list" bind:this={thumbnailList}>
		{#each previews as preview, index}
			<li
				class="item"
				class:current={currentIndex === index}
				aria-current={currentIndex === index}
				data-index={index}
				on:click={onThumbnailClick}
			>
				<img
					src={preview.thumbnail || preview.link}
					alt={preview.caption}
					loading="lazy"
					decoding="async"
				/>
			</li>
		{/each}
	</ol>
</div>

<style lang="postcss">
	.slider {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		position: relative;
	}

	.scroll-container {
		display: flex;

		aspect-ratio: 16/9;
		overflow: hidden;
		overflow-x: auto;
		scroll-padding: 50%;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scroll-snap-stop: always;
		overflow-behavior: contain;
		overflow-scrolling: touch;
		touch-action: pan-x;
	}

	.thumbnail.scroll-container {
		/* scroll-snap-align: start; */
		aspect-ratio: auto;
	}

	.slider [role='list'] {
		padding: 0;
		list-style: none;
	}

	.track {
		@apply flex gap-4;
	}
	.thumbnail .track {
		@apply gap-2;
	}

	.item {
		@apply flex justify-center content-center rounded shadow;
		/* height: 300px; */
		flex-shrink: 0;
		scroll-snap-align: center;
		aspect-ratio: 16/9;
	}
	.thumbnail .item {
		height: 60px;
		cursor: pointer;
		aspect-ratio: auto;
	}
	.thumbnail .item.current {
		border: 2px solid var(--primary-color);
	}

	.item > *,
	.item :is(picture, figure, img) {
		height: 100%;
		@apply rounded shadow;
	}
	.item img {
		@apply object-cover;
		display: block;
		width: auto;
	}

	.control {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;

		/* cursor: pointer; */
		position: absolute;
		top: 50%;
		transform: translateY(-50%);

		color: var(--primary-color);
		background-color: var(--body-background-color);
	}
	.control[disabled] {
		opacity: 0.3;
	}
	.control.start {
		inset-inline-start: 0.5rem;
	}
	.control.end {
		inset-inline-end: 0.5rem;
	}

	.scrollbar-hide {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	.scrollbar-hide::-webkit-scrollbar {
		/* For Webkit-based browsers (Chrome, Safari and Opera) */
		display: none;
	}
</style>
