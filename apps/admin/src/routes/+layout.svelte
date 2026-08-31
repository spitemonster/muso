<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'

	import Header from '../ui/global/Header.svelte'
	import Footer from '../ui/global/Footer.svelte'
	import type { Snippet } from 'svelte'

	import type { LayoutData } from './$types'

	interface Props {
		children?: Snippet
		data: LayoutData
	}

	let { children, data }: Props = $props()

	const { user } = $derived(data)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header {user}></Header>
<main class="grow">
	{@render children?.()}
</main>
<Footer></Footer>
