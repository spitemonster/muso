<script lang="ts">
	import type { Tag } from '../../types'
	import { tv } from 'tailwind-variants'

	interface Props {
		tag: Tag
		size?: 'sm' | 'md' | 'lg'
	}

	const { tag, size = 'md' }: Props = $props()

	const tagCardClass = tv({
		base: 'inline-block whitespace-nowrap border border-accent  text-accent hover:bg-accent hover:text-background transition-all',
		variants: {
			size: {
				sm: 'text-xs p-1 rounded-xs',
				md: 'text-sm p-2 rounded-sm',
				lg: 'text-base p-3 rounded-sm',
			},
		},
	})
</script>

<a href={`/tags/${tag.slug}`} class="contents">
	<figure class={tagCardClass({ size })}>
		<figcaption>
			{tag.name}
		</figcaption>
	</figure>
</a>
