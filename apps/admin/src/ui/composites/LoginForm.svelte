<script lang="ts">
	import Container from '../global/Container.svelte'
	import { TextInput } from '@muso/ui'
</script>

<form action="" class="grid grid-cols-2 gap-4 max-w-content-max-width">
	<TextInput
		label="First Name"
		name="first-name"
		type="text"
		autocomplete="given-name"
		outerClass="col-span-2 sm:col-span-1"
		placeholder="David"
		required
	/>
	<TextInput
		label="Last Name"
		name="last-name"
		type="text"
		autocomplete="family-name"
		outerClass="col-span-2 sm:col-span-1"
		placeholder="Duchovny"
		required
	/>
	<TextInput
		label="Email"
		name="email"
		type="email"
		autocomplete="email"
		placeholder="david@duchovny.com"
		outerClass="col-span-2 sm:col-span-1"
		required
	/>
	<TextInput
		label="Phone"
		name="phone"
		type="tel"
		autocomplete="tel"
		placeholder="1234567890"
		outerClass="col-span-2 sm:col-span-1"
		required
	/>
</form>
