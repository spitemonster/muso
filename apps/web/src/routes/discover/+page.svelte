<script lang="ts">
	import type { Tag, Artist, Collection, Track } from '$lib/types'
	import { CollectionList, TagList, ArtistList } from '@muso/ui'
	import { TrackCardList } from '$lib/ui/components'

	interface PageData {
		tags: Tag[]
		artists: Artist[]
		collections: Collection[]
		tracks: Track[]
	}

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	const { tags, tracks, collections, artists } = $derived(data)

	import { Container, Heading } from '@muso/ui'
</script>

<Container wide class="grid cols-1 gap-16">
	<Heading level="h1" size="xl" class="mb-7">Discover</Heading>
	{#if tags}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Tags</Heading>
			<TagList {tags} />
		</section>
	{/if}
	{#if artists}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Artists</Heading>
			<ArtistList {artists} />
		</section>
	{/if}
	{#if collections}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Collections</Heading>
			<CollectionList {collections} />
		</section>
	{/if}
	{#if tracks}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Tracks</Heading>
			<TrackCardList {tracks} />
		</section>
	{/if}
</Container>
