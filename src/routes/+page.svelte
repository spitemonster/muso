<script lang="ts">
	import type { PageData } from './$types'
	import { type SessionUserData, activeUser } from "$lib/store";
	import { onMount } from 'svelte';
	
	export let data: PageData;
	const { user } = data;

	activeUser.set(user as SessionUserData);

	// onMount(() => {
		
	// })
</script>

<section class="container">
	<h1>Muso</h1>
	<p>🖕 bandcamp</p>
	{#if user.email}
		{ user.name }
		{ user.email }
	{/if}
	<!-- <p>{ data.user.name }</p> -->
</section>
