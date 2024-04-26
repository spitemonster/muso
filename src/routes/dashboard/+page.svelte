<script lang="ts">
	import ArtistDashboard from '$lib/components/dashboard/ArtistDashboard/ArtistDashboard.svelte'
	import type { PageData } from './$types'
	import type { Artist } from '$lib/types'

	export let data: PageData;
	const artists = data.artists as Artist[]
</script>

<div class="container">
	<h1>Muso Dashboard</h1>

	{#if data.artists}
		<ArtistDashboard artists={artists} />
	{/if}
	
</div>