<script lang="ts">
	import type { Collection } from '../../types'

	interface Props {
		size: number
		collection: Collection
	}

	const { collection, size }: Props = $props()
</script>

<a href={`/artists/${collection.primaryArtist?.slug}/collections/${collection.slug}`}>
	<figure
		class="relative leading-tight rounded-md overflow-clip group bg-slate-gray text-slate-gray"
	>
		{#if collection.coverUrl}
			<img
				src={collection.coverUrl}
				alt={collection.title}
				height={size}
				width={size}
				class="w-full block"
			/>
		{:else}
			<div
				class="w-full aspect-square bg-slate-gray"
				role="img"
				aria-label={collection.title}
			></div>
		{/if}
		<figcaption
			class="mbs-3 bottom-0 w-full text-sm p-3 absolute bg-linear-90 bg-alabaster-gray text-foreground translate-y-full group-hover:translate-y-0 transition-transform"
		>
			<p class="mb-2">{collection.title}</p>
			{#if collection.artists}
				{#if collection.artists.length === 1}
					<p>
						<span>by</span>
						<span class="italic">{collection.artists[0].name}</span>
					</p>
				{:else}
					<p>
						<span>by</span>
						{#each collection.artists as artist}
							<span class="italic">{artist.name} </span>
						{/each}
					</p>
				{/if}
			{/if}
		</figcaption>
	</figure>
</a>
