<script lang="ts">
	import { format as formatDate, formatISO, formatDistanceToNow } from 'date-fns';

	export let date: Date | undefined;
	export let format = 'relative';
</script>

{#if date}
	<span
		class="has-tooltip p-1 -m-1"
		aria-label={formatDate(date, 'MMMM d, yyyy, HH:mm')}
		data-balloon-pos="up"
		data-balloon-blunt
	>
		<time datetime={formatISO(date)}>
			{#if format === 'relative'}
				{formatDistanceToNow(date, { addSuffix: true })}
			{:else}
				{formatDate(date, format)}
			{/if}
		</time>
	</span>
{/if}
