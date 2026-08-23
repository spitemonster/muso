<script lang="ts">
	import type { Snippet } from 'svelte'
	import { tv } from 'tailwind-variants'

	interface Props {
		name: string
		label: string
		children?: Snippet
		error?: string
		helper?: string
		outerClass?: string
		labelClass?: string
	}

	const {
		name,
		label,
		children,
		error = undefined,
		helper = '',
		outerClass = '',
		labelClass = '',
	} = $props()

	const calcStyles = tv({
		slots: {
			outer: 'w-full',
			label: 'block mbe-1 text-sm',
			message: '',
		},
		variants: {
			invalid: {
				true: {
					outer: '',
					label: 'text-danger',
					message: 'text-danger',
				},
			},
		},
	})

	const {
		outer: calcOuterClass,
		label: calcLabelClass,
		message: calcMessageClass,
	} = $derived(calcStyles({ invalid: !!error }))
</script>

<div class={calcOuterClass({ class: outerClass })}>
	<label class="relative inline-block w-full text-sm">
		<span class={calcLabelClass({ class: labelClass })}>
			{label}
		</span>
		{@render children?.()}
	</label>
	<span id={`${name}-description`} class={calcMessageClass()}>{error ? error : helper}</span>
</div>
