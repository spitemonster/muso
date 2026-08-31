<script lang="ts">
	import type { PageData } from './$types'
	import PageTemplate from '$lib/ui/globals/PageTemplate.svelte'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()
	const { artists } = $derived(data)
</script>

<PageTemplate>
	<h1>Dashboard</h1>
	<ul>
		{#each artists as artist}
			<li class="mb-2">
				<a href={artist.slug} class="cursor-pointer">
					{artist.name}
				</a>
			</li>
		{/each}
	</ul>
</PageTemplate>
