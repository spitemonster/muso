<script lang="ts">
	import NewArtist from "../forms/NewArtist.svelte";
	import ArtistListItem from "./ArtistListItem.svelte";
	
	export let user;
	export let artists;
</script>

<section id="manage-artists">
	<hr />
	<h2>Manage Your Artists:</h2>
		<ul>
			{#each artists as artist}
				<li>
					<ArtistListItem artist={artist} />
				</li>
			{/each}
		</ul>
	<div>
		<NewArtist adminId={user.id} />
	</div>
</section>