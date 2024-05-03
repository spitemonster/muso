<script lang="ts">
	import type {SafeUser, Artist} from '$lib/types'
	import { afterUpdate, onMount } from 'svelte';
	import ArtistListItem from './ArtistListItem.svelte';
	import NewArtist from "../forms/NewArtist.svelte";

	export let user: SafeUser;
	export let artists: Artist[];
</script>

<section id="user-dashboard">
	<h2>User Dashboard</h2>

	
	{#if artists?.length > 0}
		<hr />
		<h3>Artists You Manage: </h3>
		<ul>
			{#each artists as artist}
				<li>
					<ArtistListItem artist={artist} />
				</li>
			{/each}
		</ul>
	{/if}
	<div>
		<NewArtist adminId={user.id} />
	</div>
</section>