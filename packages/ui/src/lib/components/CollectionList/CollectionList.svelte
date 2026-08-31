<script lang="ts">
	import { tv } from 'tailwind-variants'
	import type { Collection, ColumnCount } from '../../types'
	import CollectionCard from '../CollectionCard/CollectionCard.svelte'

	interface Props {
		collections: Collection[]
		smColumns?: ColumnCount
		mdColumns?: ColumnCount
		lgColumns?: ColumnCount
		xlColumns?: ColumnCount
		class?: string
		[key: string]: unknown
	}

	const calcImgSize = (columns: 1 | 2 | 3 | 4 | 6) => {
		switch (columns) {
			case 1:
				return 1200
			case 2:
				return 600
			case 3:
				return 400
			case 4:
				return 300
			case 6:
				return 200
		}
	}

	const {
		collections,
		smColumns = 2,
		mdColumns = 3,
		lgColumns = 3,
		xlColumns = 4,
		class: className = '',
		...attrs
	}: Props = $props()

	const imgSize = $derived(calcImgSize(lgColumns))

	const collectionListClasses = tv({
		base: 'grid',
		variants: {
			smColumns: {
				1: 'grid-cols-1',
				2: 'grid-cols-2',
				3: 'grid-cols-3',
				4: 'grid-cols-4',
				6: 'grid-cols-6',
			},
			mdColumns: {
				1: 'md:grid-cols-1',
				2: 'md:grid-cols-2',
				3: 'md:grid-cols-3',
				4: 'md:grid-cols-4',
				6: 'md:grid-cols-6',
			},
			lgColumns: {
				1: 'lg:grid-cols-1',
				2: 'lg:grid-cols-2',
				3: 'lg:grid-cols-3',
				4: 'lg:grid-cols-4',
				6: 'lg:grid-cols-6',
			},
			xlColumns: {
				1: 'xl:grid-cols-1',
				2: 'xl:grid-cols-2',
				3: 'xl:grid-cols-3',
				4: 'xl:grid-cols-4',
				6: 'xl:grid-cols-6',
			},
		},
	})
</script>

{#if collections}
	<ul
		class={collectionListClasses({
			class: className,
			smColumns,
			mdColumns,
			lgColumns,
			xlColumns,
		})}
	>
		{#each collections as collection}
			<li>
				<CollectionCard size={imgSize} {collection}></CollectionCard>
			</li>
		{/each}
	</ul>
{/if}
