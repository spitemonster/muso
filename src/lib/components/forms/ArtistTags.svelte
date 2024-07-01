<script lang="ts">
	import { enhance } from "$app/forms"
import type { Artist } from "$lib/types";

export let artist: Artist;

</script>

<div class="artist-tags">
	<h2>Artist Tags</h2>
	{#if artist.tags}
		<ul>
			{#each artist.tags as tag}
				<li>{tag.name}</li>
			{/each}
		</ul>
	{/if}
	<form action="/api/artists/{artist.id}/tags" method="POST" use:enhance>
		<input type="text" name="tag_name" />
		<input type="hidden" value="{artist.id}" name="artist_id">
		<button>Add Tag</button>
	</form>
</div>