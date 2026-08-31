<script lang="ts">
	import type { Tag } from '../../types'
	import { tv } from 'tailwind-variants'

	interface Props {
		tag: Tag
		size?: 'sm' | 'md' | 'lg'
	}

	const { tag, size = 'md' }: Props = $props()

	const tagCardClass = tv({
		base: 'whitespace-nowrap p-2 border border-accent rounded-sm text-accent hover:bg-accent hover:text-background transition-all',
		variants: {
			size: {
				sm: 'text-xs',
				md: 'text-sm',
				lg: 'text-base',
			},
		},
	})
</script>

<a href={`/tags/${tag.slug}`}>
	<figure class={tagCardClass({ size })}>
		<figcaption>
			{tag.name}
		</figcaption>
	</figure>
</a>
