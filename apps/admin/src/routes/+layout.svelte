<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'

	import Header from '../ui/global/Header.svelte'
	import Footer from '../ui/global/Footer.svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		children?: Snippet
	}

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header></Header>
<main class="grow">
	{@render children()}
</main>
<Footer></Footer>
