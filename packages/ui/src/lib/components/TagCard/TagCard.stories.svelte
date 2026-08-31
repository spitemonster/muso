<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TagCard from './TagCard.svelte'
	import type { Tag } from '../../types'

	const tag: Tag = {
		id: 'fake-id',
		name: 'Tag Card',
		slug: 'tag-card',
	}

	const { Story } = defineMeta({
		title: 'UI/Components/Tags/TagCard',
		component: TagCard,
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg'],
				defaultValue: 'md',
			},
		},
	})
</script>

<Story
	name="Default"
	args={{
		tag,
		size: 'md',
	}}
/>
