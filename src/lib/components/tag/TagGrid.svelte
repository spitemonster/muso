<script lang="ts">
	import type { Tag } from '$lib/types';
	import { Tag as TagView } from '$lib/components'

	export let tags: Tag[]
	export let className: string = "";
</script>

{#if tags.length > 0}

<div class={`tag-grid ${className}`}>
	<slot></slot>
	<ul class="flex gap-base flex-wrap">
		{#each tags as tag}
			<li>
				<TagView tag={tag} />
			</li>
	
		{/each}
	</ul>
</div>

{/if}