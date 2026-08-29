<script lang="ts">
	import type { PageData } from './$types'
	import type { User } from '$lib/types'

	let { data }: { data: PageData } = $props()
	const { user } = $derived(data)
</script>

<div>
	<h1>Dashboard</h1>
	<h2>{user.name}</h2>
</div>
