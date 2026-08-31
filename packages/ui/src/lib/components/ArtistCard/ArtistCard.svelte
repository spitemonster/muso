<script lang="ts">
	interface Artist {
		name: string
		location: string
		biography: string
	}

	interface Props {
		artist: Artist
	}

	const { artist } = $props()

	const { name, location, biography } = $derived(artist)
</script>

<div class="artist-card">
	<p>{name}</p>
	<p>{location}</p>
	<p>{biography}</p>
</div>
