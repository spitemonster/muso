<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData;
</script>

<section class="container">
	<h1>Muso</h1>
	<!-- {user} -->
	<!-- {data?.user?.email} -->
	<!-- {#if user?.email }
		<p>Hey, { user.name }!</p>
	{:else}
		<p>🖕 bandcamp</p>
	{/if} -->
	<!-- <p>{ data.user.name }</p> -->
</section>
