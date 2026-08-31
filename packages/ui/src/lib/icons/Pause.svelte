<script lang="ts">
	interface Props {
		class?: string
	}

	const { class: className = '' } = $props()
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="currentColor"
	class={className}><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z" class={className} /></svg
>
