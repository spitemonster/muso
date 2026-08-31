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
	class={className}><path d="M3 22v-20l18 10-18 10z" /></svg
>
