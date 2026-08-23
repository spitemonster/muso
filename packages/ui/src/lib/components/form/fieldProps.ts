import type { HTMLInputAttributes } from 'svelte/elements'

export interface FieldProps extends HTMLInputAttributes {
	label: string
	name: string
	required?: boolean
	placeholder?: string
	helper?: string
	error?: string
	outerClass?: string
	labelClass?: string
}
