<script lang="ts">
	import type { Tag } from '../../types'
	import { tv } from 'tailwind-variants'
	import { default as IconTag } from '../../icons/Tag.svelte'

	interface Props {
		tag: Tag
		size?: 'sm' | 'md' | 'lg'
		icon?: boolean
	}

	const { tag, size = 'md', icon = true }: Props = $props()

	const tagCardClass = tv({
		base: 'inline-flex items-center whitespace-nowrap border border-accent shrink text-accent hover:bg-accent hover:text-background focus:bg-accent focus:text-background transition-all',
		variants: {
			size: {
				sm: 'text-xs p-1 rounded-xs gap-1',
				md: 'text-sm p-2 rounded-sm gap-2',
				lg: 'text-base p-3 rounded-sm gap-2',
			},
		},
	})
</script>

<li class="flex">
	<a href={`/tags/${tag.slug}`} class={tagCardClass({ size })}>
		{#if icon}
			<span class="relative w-3 h-3 block aspect-square">
				<IconTag class="absolute h-full w-full shrink-0" />
			</span>
		{/if}
		<span class="text-box-tight">{tag.name}</span>
	</a>
</li>
