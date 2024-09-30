<script lang="ts">
	import type { Album } from "$lib/types";

	export let album: Album;
</script>

<a class="contents" href={`/album/${album.id}`}>
	<figure class="album-card relative block w-full h-auto aspect-square">
		<img class="absolute top-auto left-auto block w-full h-full" src={album.coverUrl} alt="Album cover" height="400" width="400" loading="lazy">
		<figcaption class="absolute z-10 bottom-base left-base">
			<strong>{album.title}</strong>
		</figcaption>
	</figure>
</a>