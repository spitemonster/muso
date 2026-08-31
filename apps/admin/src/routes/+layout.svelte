<script lang="ts">
	import '../app.css'
	import favicon from '$lib/assets/favicon.svg'

	import { Header, Footer } from '@muso/ui'
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

<Header brand="Muso Admin" {user}></Header>
<main class="grow">
	{@render children?.()}
</main>
<Footer brand="Muso Admin">
	<li>Privacy Policy</li>
	<li>Contact</li>
	<li>Copyright {new Date().getFullYear()}</li>
</Footer>
