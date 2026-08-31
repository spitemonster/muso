<script lang="ts">
	import type { Artist } from '../../types'

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
				class="w-16 h-16 rounded-full col-span-1"
				height="64"
				width="64"
			/>
		{:else}
			<div
				class="w-16 h-16 bg-slate-gray rounded-full"
				role="img"
				aria-label={artist.name}
			></div>
		{/if}
		<figcaption class="col-span-3">
			<p>{artist.name}</p>
		</figcaption>
	</figure>
</a>
