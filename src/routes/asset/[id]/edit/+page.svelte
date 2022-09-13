<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import AssetForm from '$lib/asset/form.svelte';
	import { t } from '$lib/translations';

	import type { PageData } from './$types';

	export let data: PageData;
	$: asset = data.asset;
</script>

<Meta noindex={true} title={$t('Edit “{{title}}”', { title: asset.title })} />

<div class="container">
	<div class="text-center text-xl font-medium">
		{$t('Submit an asset to Godot Asser Library')}
	</div>

	<AssetForm {asset} />
</div>
