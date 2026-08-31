<script lang="ts">
	import type { Tag } from '../../types'
	import { tv } from 'tailwind-variants'

	interface Props {
		tag: Tag
		size?: 'sm' | 'md' | 'lg'
	}

	const { tag, size = 'md' }: Props = $props()

	const tagCardClass = tv({
		base: 'inline-block whitespace-nowrap border border-accent rounded-sm text-accent hover:bg-accent hover:text-background transition-all',
		variants: {
			size: {
				sm: 'text-xs p-1',
				md: 'text-sm p-2',
				lg: 'text-base p-3',
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
