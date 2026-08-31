<script lang="ts">
	import type { Artist } from '$lib/types'
	interface Props {
		artist: Artist
	}

	const { artist }: Props = $props()
</script>

<a href={`/artists/${artist.slug}`}>
	<figure class="bg-neutral p-3 flex items-center gap-3 rounded-md">
		<img
			src={artist.profileImageUrl}
			alt={artist.name}
			class="rounded-full col-span-1"
			height="100"
			width="100"
		/>
		<figcaption class="col-span-3">
			<p>{artist.name}</p>
		</figcaption>
	</figure>
</a>
