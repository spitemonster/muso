<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'

	import Header from '$lib/ui/globals/Header.svelte'
	import Footer from '$lib/ui/globals/Footer.svelte'
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

<Header></Header>
<main class="grow">
	{@render children?.()}
</main>
<Player />
<Footer></Footer>
