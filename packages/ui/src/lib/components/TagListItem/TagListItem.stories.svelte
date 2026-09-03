<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TagListItem from './TagListItem.svelte'
	import type { Tag } from '../../types'

	const tag: Tag = {
		id: 'fake-id',
		name: 'Tag List Item',
		slug: 'tag-list-item',
	}

	const { Story } = defineMeta({
		title: 'UI/Components/Tags/TagListItem',
		component: TagListItem,
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg'],
				defaultValue: 'md',
			},
			icon: {
				control: 'boolean',
				defaultValue: true,
			},
		},
	})
</script>

<Story
	name="Default"
	args={{
		tag,
		size: 'md',
		icon: true,
	}}
/>
