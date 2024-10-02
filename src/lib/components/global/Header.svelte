<script lang="ts">
	import { PrimaryNavigation } from '$lib/components'
	import { loginSession } from '$lib/stores';
	

</script>

<header>
	<PrimaryNavigation user={$loginSession}></PrimaryNavigation>
</header>