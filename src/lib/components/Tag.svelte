<script lang="ts">
	import type { Tag } from '$lib/types';

	import TagIcon from '$lib/icons/TagIcon.svelte';
	export let tag: Tag;
</script>

<a class="block border rounded p-xs" href={`/tag/${tag.id}`}>
	{tag.name}
	<TagIcon />
</a>