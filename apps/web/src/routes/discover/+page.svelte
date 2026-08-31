<script lang="ts">
	import type { Tag, Artist, Collection, Track } from '$lib/types'
	import { CollectionList, TagList, ArtistList, TrackCardList } from '$lib/ui/components'

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
	{#if tags}
		<section>
			<Heading level="h1" size="xl" class="mb-5">Tags</Heading>
			<TagList class="gap-3" {tags} />
		</section>
	{/if}
	{#if artists}
		<section>
			<Heading level="h1" size="xl" class="mb-5">Artists</Heading>
			<ArtistList {artists} />
		</section>
	{/if}
	{#if collections}
		<section>
			<Heading level="h1" size="xl" class="mb-5">Collections</Heading>
			<CollectionList class="gap-3" {collections} />
		</section>
	{/if}
	{#if tracks}
		<section>
			<Heading level="h1" size="xl" class="mb-5">Tracks</Heading>
			<TrackCardList {tracks} />
		</section>
	{/if}
</Container>
