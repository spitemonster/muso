<script lang="ts">
	import type { User, Artist} from '$lib/types'
	import { afterUpdate, onMount } from 'svelte';
	import ArtistListItem from './ArtistListItem.svelte';
	import NewArtist from "../forms/NewArtist.svelte";
	import ManageArtists from './ManageArtists.svelte';

	export let user: User;
	export let artists: Artist[];
</script>

<section id="user-dashboard">
	<h2>User Dashboard</h2>

	<ManageArtists user={user} artists={artists} />
</section>