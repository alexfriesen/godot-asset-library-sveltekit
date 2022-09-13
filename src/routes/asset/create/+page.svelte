<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import AssetForm from '$lib/asset/form.svelte';
	import { t } from '$lib/translations';
</script>

<Meta noindex={true} title={$t('Submit an asset')} />

<div class="container">
	<div class="text-center text-xl font-medium">
		{$t('Submit an asset to Godot Asser Library')}
	</div>

	<AssetForm />
</div>
