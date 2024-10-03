<script lang="ts">
	import type { Artist } from '$lib/types';
	import { ArtistCard } from '$lib/components';

	export let artists: Artist[];
	export let className: string = "";
</script>

{#if artists.length > 0}

	<div class={`artist-card-grid ${className}`}>
		<slot></slot>
		<ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols:3 gap-base">

			{#each artists as artist}
				<li>
					<ArtistCard artist={artist} />
				</li>
			{/each}
		</ul>
	</div>

{/if}