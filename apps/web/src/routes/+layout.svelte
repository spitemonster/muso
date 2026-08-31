<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'

	import { Header, Footer } from '@muso/ui'
	import Player from '$lib/ui/components/Player/Player.svelte'

	import type { Snippet } from 'svelte'

	import type { LayoutData } from './$types'

	interface Props {
		children?: Snippet
		data: LayoutData
	}

	let { children, data }: Props = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header brand="Muso">
	<li><a href="/discover">Discover</a></li>
</Header>
<main class="grow">
	{@render children?.()}
</main>
<Player />
<Footer brand="Muso" />
