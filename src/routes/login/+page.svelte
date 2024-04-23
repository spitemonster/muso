<script>
	import LoginForm from "$lib/components/LoginForm/LoginForm.svelte";
	// import {enhance} from '$app/forms';
    // // import {user} from '../../stores';
    // export let form;
    // export let data;

    // $:clearUser = data?.clearUser;

    // $:{
    //     // if(clearUser) user.set(undefined);
    // }
</script>

<section class="container">
	<h1>Log In</h1>
	<LoginForm />
</section>