<script lang="ts">
	import type { Album } from "$lib/types";

	export let album: Album;
</script>

<!-- {album.songs} -->
<figure class="album-card">
	<img src={album.coverUrl} alt="Album cover" height="400" width="400" loading="lazy">
	<figcaption>
		<!-- <strong>{album.ar}</strong> -->
	</figcaption>
</figure>

<style lang="scss">
	.album-card {
		position: relative;

		display: block;
		width: 100%;
		height: auto;

		aspect-ratio: 1/1;

		img {
			position: absolute;
			top: 0;
			left: 0;

			display: block;
			height: 100%;
			width: 100%;
		}

		&:hover {
			cursor: pointer;
		}
	}
</style>