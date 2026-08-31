<script lang="ts">
	import type { Snippet } from 'svelte'

	import type { HTMLAttributes } from 'svelte/elements'
	import { tv } from 'tailwind-variants'

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		children?: Snippet
		level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
		size?: 'base' | 'lg' | 'xl' | '2xl' | '3xl' | 'display-sm' | 'display-md' | 'display-lg'
	}

	const { children, level, size, class: className = '', ...rest } = $props()

	const headingClass = tv({
		base: '',
		variants: {
			size: {
				base: 'text-base font-mono',
				lg: 'text-lg',
				xl: 'text-xl',
				'2xl': 'text-2xl',
				'3xl': 'text-3xl',
				'display-sm': 'text-display-sm',
				'display-md': 'text-display-md',
				'display-lg': 'text-display-lg',
			},
		},
		defaultVariants: { size: 'xl' },
	})
</script>

<svelte:element this={level} class={headingClass({ size, class: className })} {...rest}>
	{@render children?.()}
</svelte:element>
