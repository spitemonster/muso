<script lang="ts">
	import type { Artist } from '$lib/types'
	interface Props {
		artist: Artist
	}

	const { artist }: Props = $props()
</script>

<a href={`/artists/${artist.slug}`}>
	<figure class="bg-neutral p-3 flex items-center gap-3 rounded-md">
		{#if artist.profileImageUrl}
			<img
				src={artist.profileImageUrl}
				alt={artist.name}
				class="h-16 w-16 rounded-full col-span-1 bg-slate-gray"
				height="64"
				width="64"
			/>
		{:else}
			<div class="block aspect-square w-16 rounded-full col-span-1 bg-slate-gray"></div>
		{/if}
		<figcaption class="col-span-3">
			<p>{artist.name}</p>
		</figcaption>
	</figure>
</a>
