<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import ArtistCard from './ArtistCard.svelte'

	const { Story } = defineMeta({
		title: 'UI/Components/ArtistCard',
		component: ArtistCard,
	})

	const fakeImage = (seed) => `https://picsum.photos/seed/${seed}/128/128`
</script>

<Story
	name="With Image"
	args={{
		artist: {
			id: '1',
			name: 'Nova Sinclair',
			slug: 'nova-sinclair',
			profileImageUrl: fakeImage('nova-sinclair'),
		},
	}}
/>

<Story
	name="Without Image"
	args={{
		artist: {
			id: '2',
			name: 'Nova Sinclair',
			slug: 'nova-sinclair',
		},
	}}
/>

<Story
	name="Long Name"
	args={{
		artist: {
			id: '3',
			name: 'The Amalgamated Session Musicians Collective',
			slug: 'the-amalgamated-session-musicians-collective',
			profileImageUrl: fakeImage('long-name'),
		},
	}}
/>
