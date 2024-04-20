<script lang="ts">
	import { EmailField, PasswordField } from "$lib/components/form-fields";
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<EmailField />
	<PasswordField />
	<button>Log In</button>
</form>