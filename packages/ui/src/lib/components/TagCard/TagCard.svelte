<script lang="ts">
	import type { Tag } from '../../types'

	interface Props {
		tag: Tag
	}

	const { tag }: Props = $props()
</script>

<a href={`/tags/${tag.slug}`}>
	<figure
		class="whitespace-nowrap p-2 border border-accent rounded-sm text-accent hover:bg-accent hover:text-background transition-all"
	>
		<figcaption>
			{tag.name}
		</figcaption>
	</figure>
</a>
