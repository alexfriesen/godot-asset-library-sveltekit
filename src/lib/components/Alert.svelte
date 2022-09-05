<script lang="ts">
	const getClasses = (type: string) => {
		switch (type) {
			case 'info':
				return 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-1000 dark:border-blue-500 dark:text-blue-200';
			case 'warning':
				return 'bg-yellow-100 border-yellow-500 text-yellow-800 dark:bg-yellow-1000 dark:border-yellow-500 dark:text-yellow-200';
			case 'error':
				return 'bg-red-100 border-red-500 text-red-700 dark:bg-red-1000 dark:border-red-500 dark:text-red-200';
			case 'success':
				return 'bg-green-100 border-green-500 text-green-700 dark:bg-green-1000 dark:border-green-500 dark:text-green-200';
		}
	};
	export let type = 'info';
</script>

<div class="px-5 py-3 mb-8 rounded border-l-4 {getClasses(type)}" role="alert">
	<slot />
</div>
