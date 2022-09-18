<script lang="ts">
	import type { User } from '@prisma/client';
	import { t } from '$lib/translations';
	import { isAdmin } from '$lib/permissions';

	export let currentUser: User;
</script>

<footer class="mt-12 py-12 bg-gray-300 text-gray-600 dark:bg-gray-900 text-center">
	© 2022 —
	<a class="link" href="/developer/v1/">
		{$t('API documentation')}
	</a>
	{#if isAdmin(currentUser)}
		—
		<a class="link" href="/admin">
			{$t('Administration panel')}
		</a>
	{/if}
</footer>
