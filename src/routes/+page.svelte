<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import { type SafeUser } from "$lib/types/user";
	import type { PageData } from './$types'
	import { activeUser } from "$lib/store";
	
	export let data: PageData;
	
	const user = data.user ?? {
		name: "",
		email: ""
	}

	$:ActiveUser = data?.user as SafeUser

	$:{
		const u = data?.user as SafeUser
		activeUser.set(u)
	}
</script>

<section class="container">
	<h1>Muso</h1>
	{#if ActiveUser?.email }
		<p>Hey, { ActiveUser.name }!</p>
	{:else}
		<p>🖕 bandcamp</p>
	{/if}
	<!-- <p>{ data.user.name }</p> -->
</section>
