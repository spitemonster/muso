<script lang="ts">
	import type { Tag } from '$lib/types'
	import TagCard from '../TagCard/TagCard.svelte'

	interface Props {
		tags: Tag[]
		class?: string
		[key: string]: unknown
	}

	const { tags, class: className, ...attrs }: Props = $props()
</script>

<section class="tag-list">
	<ul class={`${className} flex flex-wrap`} {...attrs}>
		{#each tags as tag}
			<li>
				<TagCard {tag} />
			</li>
		{/each}
	</ul>
</section>
