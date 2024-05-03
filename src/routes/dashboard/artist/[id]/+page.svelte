<script lang="ts">
	import { ArtistDashboard } from '$lib/components'
	export let data;

	const { artist } = data;

	if (!artist) {
		throw Error();
	}
</script>

<div class="container">
	<h2>Artist Dashboard</h2>
	<a href="/dashboard">Back to Dashboard</a>
	<ArtistDashboard artist={artist} />
</div>
