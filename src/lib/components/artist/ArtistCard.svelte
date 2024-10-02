<script lang="ts">
	import type {Artist} from '$lib/types';

	export let artist: Artist;
</script>

<a href={`/artist/${artist.id}`}>
	<figure class="flex gap-base bg-white text-black p-base rounded">
		<img class="inline-block h-xxl aspect-square rounded-full" src={artist.profileImageUrl} alt={artist.name}>
		<figcaption class="inline-block">
			<p class="mb-base font-bold font-mono">{artist.name}</p>
			<div class="text-sm">
				<p>{artist.biography}</p>
			</div>
		</figcaption>
	</figure>
</a>