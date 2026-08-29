<script lang="ts">
	import { getDefaultInputStyles } from '../helpers'
	import InputWrapper from '../InputWrapper/InputWrapper.svelte'
	import { EyeClosed, EyeOpen } from '@muso/ui'
	import { tv } from 'tailwind-variants'

	import { type FieldProps } from '../fieldProps'
	interface Props extends FieldProps {}

	const {
		label,
		name,
		required = false,
		placeholder = 'Password',
		helper = '',
		error = undefined,
		outerClass = '',
		labelClass = '',
	} = $props()

	let passwordVisible: boolean = $state(false)

	const calcClasses = tv({
		slots: {
			input: `peer ${getDefaultInputStyles()}`,
			label: '',
			outer: '',
			openIcon: '',
			closedIcon: '',
			passwordToggle: 'absolute right-2 bottom-2 cursor-pointer aspect-square w-6',
		},
		variants: {
			invalid: {
				true: {
					input: 'outline-danger outline-2',
				},
			},
			passwordVisible: {
				true: {
					openIcon: '',
					closedIcon: 'hidden',
				},
				false: {
					openIcon: 'hidden',
					closedIcon: '',
				},
			},
		},
	})

	const {
		input: calcInputClass,
		label: calcLabelClass,
		outer: calcOuterClass,
		openIcon: calcOpenClass,
		closedIcon: calcClosedClass,
		passwordToggle: calcToggleClass,
	} = $derived(calcClasses({ invalid: !!error, passwordVisible }))
</script>

<InputWrapper
	{label}
	{name}
	{helper}
	{error}
	outerClass={calcOuterClass({ class: outerClass })}
	labelClass={calcLabelClass({ class: labelClass })}
>
	<input
		{name}
		type={passwordVisible ? 'text' : 'password'}
		class={calcInputClass()}
		aria-invalid={!!error}
		aria-describedby={`${name}-description`}
		placeholder={placeholder ? placeholder : 'Password'}
		{required}
	/>
	<button
		type="button"
		class={calcToggleClass()}
		aria-pressed={`${!!passwordVisible}`}
		onclick={() => (passwordVisible = !passwordVisible)}
	>
		<figure class={calcOpenClass()}>
			<EyeOpen height="24" width="24" />
			<figcaption class="sr-only">Hide</figcaption>
		</figure>
		<figure class={calcClosedClass()}>
			<EyeClosed height="24" width="24" />
			<figcaption class="sr-only">Show</figcaption>
		</figure>
	</button>
</InputWrapper>
