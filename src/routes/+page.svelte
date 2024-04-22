<script lang="ts">
	import { beforeNavigate } from "$app/navigation";
	import { page } from "$app/stores";

	import type { PageData } from './$types'
	import { type SessionUserData, activeUser } from "$lib/store";
	import { beforeUpdate, onMount } from "svelte";
	
	export let data: PageData;
	
	const user = data.user ?? {
		name: "",
		email: ""
	}

	beforeUpdate(() => {
		activeUser.set(user as SessionUserData);
	})
</script>

<section class="container">
	<h1>Muso</h1>
	<!-- {#if user.email}
		<p>Hey, { user.name }!</p>
	{:else}
		<p>🖕 bandcamp</p>
	{/if} -->
	<!-- <p>{ data.user.name }</p> -->
</section>
