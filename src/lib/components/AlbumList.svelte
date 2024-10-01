<script lang="ts">
	import { AlbumCard } from '$lib/components';

	import type {Album} from '$lib/types';

	export let albums: Album[];
</script>

<ul>
	{#each albums as album}
			<li>
				<AlbumCard album={album} />
			</li>
		{/each}
</ul>