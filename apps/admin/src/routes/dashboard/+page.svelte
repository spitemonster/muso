<script lang="ts">
	import type { PageData } from './$types'
	import { Container, Heading } from '@muso/ui'

	let { data }: { data: PageData } = $props()
	const { user } = $derived(data)
</script>

<Container align="center">
	<Heading level="h1" size="xl" class="mb-5 font-bold">Dashboard</Heading>
	<Heading level="h2" size="md">Welcome, {user.name}. Good to see you again.</Heading>
</Container>
