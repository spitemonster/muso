<script lang="ts">
	import type { Tag } from '../../types'
	import { TagListItem } from '@muso/ui'

	interface Props {
		tags: Tag[]
		size?: 'sm' | 'md' | 'lg'
		icon?: boolean
		class?: string
		[key: string]: unknown
	}

	const { tags, size, icon = true, class: className = '', ...attrs }: Props = $props()
</script>

<ul class={`flex flex-wrap gap-3 justify-start ${className}`} {...attrs}>
	{#each tags as tag}
		<TagListItem {tag} {size} {icon} />
	{/each}
</ul>
