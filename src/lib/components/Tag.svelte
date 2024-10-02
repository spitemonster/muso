<script lang="ts">
	import type { Tag as TagType } from '$lib/types';

	import TagIcon from '$lib/icons/TagIcon.svelte';
	export let tag: TagType;
</script>

<a class="inline-block border rounded p-xs" href={`/tag/${tag.id}`}>
	{tag.name}
	<TagIcon />
</a>