<script lang="ts">
	import { Container, Heading } from '@muso/ui'
	import type { PageData } from './$types'
	import { ArtistList, CollectionList } from '@muso/ui'
	import { TrackCardList } from '$lib/ui/components'

	interface Props {
		data: PageData
	}

	const { data } = $props()
	const { tag, artists, collections, tracks } = $derived(data)
</script>

<Container class="grid grid-cols-1 gap-7">
	<section>
		<Heading level="h1" size="xl" class="mb-7">{tag.name}</Heading>
	</section>
	{#if tracks}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Tracks tagged with {tag.name}</Heading>
			<TrackCardList {tracks} />
		</section>
	{/if}
	{#if collections}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Collections tagged with {tag.name}</Heading>
			<CollectionList {collections} lgColumns={3} xlColumns={3} />
		</section>
	{/if}
	{#if artists}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Artists tagged with {tag.name}</Heading>
			<ArtistList {artists} />
		</section>
	{/if}
</Container>
