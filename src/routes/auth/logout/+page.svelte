<script>
	import { t } from '$lib/translations';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="container">
	<h2>Logout</h2>
	<p>{$t('You have been logged out!')}</p>

	<Button href="/">Back to Home</Button>
</div>
