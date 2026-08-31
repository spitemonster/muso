<script lang="ts">
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
		<div class="grid grid-cols-3 gap-3">
			<div class="col-span-2 grid gap-5">
				<Heading level="h1" size="xl" class="font-bold leading-tight"
					>{collection.title}</Heading
				>
				<p class="leading-tight">{collection.description}</p>
				<div>
					<ol class="list-decimal list-inside flex flex-col">
						{#each collection.tracks as track}
							<li class="pbe-3 mbe-3 border-b-2 border-accent">
								{track.title}
							</li>
						{/each}
					</ol>
				</div>
			</div>
			<div class="col-span-1">
				<figure>
					<img src={collection.coverUrl} alt={collection.title} />
				</figure>
			</div>
		</div>
	{/if}
</Container>
