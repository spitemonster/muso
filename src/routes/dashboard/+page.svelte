<script lang="ts">
	import ArtistDashboard from '$lib/components/dashboard/ArtistDashboard/ArtistDashboard.svelte'
	import type { PageData } from './$types'
	export let data: PageData;
</script>

<div class="container">
	<h1>Muso Dashboard</h1>

	{#if data.artists}
		<ArtistDashboard artists={data.artists} />
	{/if}
	
</div>