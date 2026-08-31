<script lang="ts">
	import type { Artist } from '../../types'
	import ArtistCard from '../ArtistCard/ArtistCard.svelte'

	interface Props {
		artists: Artist[]
		class?: string
		[key: string]: unknown
	}

	const {
		artists,
		class: className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3',
	}: Props = $props()
</script>

<div class="artist-list">
	<ul class={className}>
		{#each artists as artist}
			<li>
				<ArtistCard {artist} />
			</li>
		{/each}
	</ul>
</div>
