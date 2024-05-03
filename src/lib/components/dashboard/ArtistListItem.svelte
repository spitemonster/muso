<script lang="ts">
	import type { Artist } from "$lib/types";

	export let artist: Artist;

	
</script>
<div class="artist-list-item">
	<p>{artist.name}</p> <a href={`/dashboard/artist/${artist.id}`}>Manage Artist</a>
</div>