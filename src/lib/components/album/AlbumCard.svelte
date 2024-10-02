<script lang="ts">
	import AlbumCover from '$lib/components';
	import type { Album } from "$lib/types";

	export let album: Album;
</script>

<a class="contents" href={`/album/${album.id}`}>
	<AlbumCover album={album} />
</a>