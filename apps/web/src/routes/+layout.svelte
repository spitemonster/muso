<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'

	import Header from '$lib/globals/Header.svelte'
	import Footer from '$lib/globals/Footer.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header></Header>
{@render children()}
<Footer></Footer>
