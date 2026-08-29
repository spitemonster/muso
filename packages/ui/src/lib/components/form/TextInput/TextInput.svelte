<script lang="ts">
	import { tv } from 'tailwind-variants'
	import { getDefaultInputStyles } from '../helpers'
	import InputWrapper from '../InputWrapper/InputWrapper.svelte'

	import { type FieldProps } from '../fieldProps'
	interface Props extends FieldProps {
		type: 'text' | 'email' | 'tel'
	}

	const {
		label,
		name,
		required,
		type,
		placeholder = '',
		helper = '',
		error = undefined,
		outerClass = '',
		labelClass = '',
		...attr
	} = $props()

	const calcClasses = tv({
		slots: {
			input: `peer ${getDefaultInputStyles()}`,
			outer: '',
			label: '',
		},
		variants: {
			invalid: {
				true: {
					input: 'outline-2 outline-danger',
				},
				false: {
					input: '',
				},
			},
		},
	})

	const calcPattern = (type: 'text' | 'email' | 'tel') => {
		switch (type) {
			case 'email':
				return "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
			case 'tel':
				return '^+[1-9]d{1,14}$'
			default:
				return undefined
		}
	}

	const { input: calcInputClass } = $derived(calcClasses({ invalid: !!error }))
</script>

<InputWrapper {name} {label} {error} {helper} {outerClass} {labelClass}>
	<input
		id={name}
		{type}
		{name}
		aria-invalid={!!error}
		aria-describedby={error ? `${name}-description` : undefined}
		required={!!required}
		class={calcInputClass()}
		{placeholder}
		title={label}
		pattern={calcPattern(type)}
		{...attr}
	/>
</InputWrapper>
