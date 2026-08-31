<script lang="ts">
	import type { PageData } from './$types'

	interface Props {
		data: PageData
	}

	const { data } = $props()

	const { artist } = $derived(data)
</script>

<h1>{artist.name}</h1>
