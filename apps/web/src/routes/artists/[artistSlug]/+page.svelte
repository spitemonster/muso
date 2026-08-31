<script lang="ts">
	import { CollectionList } from '$lib/ui/components'
	import TagList from '$lib/ui/components/tags/TagList/TagList.svelte'
	import type { PageData } from './$types'
	import { Container, Heading } from '@muso/ui'

	interface Props {
		data: PageData
	}

	const { data } = $props()

	const { artist } = $derived(data)

	const { collections, tags } = $derived(artist)
</script>

<Container class="grid grid-cols-1 gap-7">
	<section>
		<Heading level="h1" size="xl" class="mb-7">{artist.name}</Heading>
		{#if artist.biography}
			<p class="mb-5">{artist.biography}</p>
		{/if}
	</section>
	{#if collections}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Collections</Heading>
			<CollectionList {collections} />
		</section>
	{/if}
	{#if tags}
		<section>
			<Heading level="h2" size="lg" class="mb-5">Tags</Heading>
			<TagList {tags} />
		</section>
	{/if}
</Container>
