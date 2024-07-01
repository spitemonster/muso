<script lang="ts">
	import { enhance } from "$app/forms"
	export let adminId: string;
</script>

<form class="ui-form" action="/api/artists" method="POST" use:enhance>
	<input type="hidden" value={adminId} name="adminId" />
	<label>
		<input type="text" placeholder=" " name="name" required>
		<span>Artist Name</span>
	</label>
	<label>
		<input type="text" placeholder=" " name="url">
		<span>Artist URL</span>
	</label>
	<button>create artist</button>
</form>