<script lang="ts">
	import { PrimaryNavigation } from '.'
	import { loginSession } from '$lib/stores';
	

</script>

<header>
	<PrimaryNavigation user={$loginSession}></PrimaryNavigation>
</header>