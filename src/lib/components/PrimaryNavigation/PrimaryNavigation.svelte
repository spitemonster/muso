<script lang="ts">
	import { enhance } from "$app/forms";
	import type { User } from "$lib/types/user.type";
	export let user: User
</script>

<nav class="container mb-base">
	<menu class="flex gap-base text-nowrap">
		<li><a href="/">Home</a></li>
		<li><a href="/discover">Discover</a></li>
		<div class="w-full"></div>
		{#if user}
			<li><a href="/dashboard">Dashboard</a></li>
		{/if}
		{#if user != undefined && user.email != "" }
			<li><form method="POST" action="/logout" use:enhance><button class="text ">Logout</button></form></li>
		{:else }
			<li><a class="" href="/login">Log In</a></li>
			<li><a class="btn " href="/sign-up">Sign Up</a></li>
		{/if}
	</menu>
</nav>