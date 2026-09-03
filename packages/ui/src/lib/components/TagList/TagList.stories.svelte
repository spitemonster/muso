<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import TagList from './TagList.svelte'

	import { fakeTags } from './fakeTags'

	const { Story } = defineMeta({
		title: 'UI/Components/Tags/TagList',
		component: TagList,
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
		tags: fakeTags,
		size: 'md',
		icon: true,
	}}
/>
