<script lang="ts">
	import Tracklist from '$lib/ui/components/tracks/Tracklist/Tracklist.svelte'
	import type { PageData } from './$types'
	import { Container, Heading } from '@muso/ui'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	const { collection } = $derived(data)
</script>

<Container>
	{#if collection}
		<div class="grid grid-cols-1 md:grid-cols-5 md:gap-7">
			<div class="col-span-3 grid gap-5">
				<Heading level="h1" size="xl" class="font-bold leading-tight mb-5"
					>{collection.title}</Heading
				>
				<p class="leading-tight mb-7">{collection.description}</p>
				<Tracklist tracks={collection.tracks ?? []} />
			</div>
			<div class="col-span-2">
				{#if collection.coverUrl}
					<figure>
						<img src={collection.coverUrl} alt={collection.title} />
					</figure>
				{:else}
					<div class="w-full aspect-square rounded-md bg-slate-gray"></div>
				{/if}
			</div>
		</div>
	{/if}
</Container>
