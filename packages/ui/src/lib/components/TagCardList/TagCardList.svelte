<script lang="ts">
	import type { Tag } from '../../types'
	import { default as TagCard } from '../TagCard/TagCard.svelte'

	interface Props {
		tags: Tag[]
		size?: 'sm' | 'md' | 'lg'
		class?: string
		[key: string]: unknown
	}

	const { tags, size, class: className = '', ...attrs }: Props = $props()
</script>

<section class="tag-list">
	<ul class={`${className} flex flex-wrap gap-3`} {...attrs}>
		{#each tags as tag}
			<li>
				<TagCard {tag} {size} />
			</li>
		{/each}
	</ul>
</section>
