<script lang="ts">
	import { ArtistDashboard, UserDashboard } from '$lib/components/'
	import type { PageData } from './$types'
	import makeGreeting from '$lib/utils/makeGreeting';
	import { redirect } from '@sveltejs/kit';

	export let data: PageData;
	const { user, artists } = data;

	if (!user) {
		redirect(302, '/login');
	}
	
	const greeting = makeGreeting(user?.name);
</script>

<div class="container">
	<h1>{ greeting }</h1>
	<UserDashboard user={user} artists={artists ?? []} />
</div>