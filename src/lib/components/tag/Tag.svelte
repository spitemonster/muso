<script lang="ts">
	import type { Tag as TagType } from '$lib/types';

	import TagIcon from '$lib/icons/TagIcon.svelte';
	export let tag: TagType;

	if (!tag) {
		throw new Error("no tag given to tag view");
	}
</script>

<a class="inline-block border rounded p-1 text-sm" href={`/tag/${tag.slug}`}>
	{tag.name}
	<TagIcon />
</a>