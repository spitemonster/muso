<script lang="ts">
	import { activeUser } from "$lib/store";
	import type { SafeUser } from "$lib/types/user";
	export let user: SafeUser | undefined;
</script>
<section id="artist-dashboard" class="dashboard">
	<h2>Artist Dashboard</h2>
	{user?.name}
</section>