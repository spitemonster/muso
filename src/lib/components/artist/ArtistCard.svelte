<script lang="ts">
	import type {Artist} from '$lib/types';

	export let artist: Artist;

	if (!artist) {
		throw new Error("no artist");
	}
</script>

<a href={`/artist/${artist.slug}`}>
	<figure class="flex gap-base bg-white text-black p-base rounded h-full">
		<img class="inline-block h-xxl aspect-square rounded-full" src={artist.profileImageUrl} alt={artist.name}>
		<figcaption class="inline-block">
			<p class="mb-base font-bold font-mono">{artist.name}</p>
			<div class="text-sm line-clamp-3">
				<p>{artist.biography}</p>
			</div>
		</figcaption>
	</figure>
</a>