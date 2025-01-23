import CocktailDivComponent from '@/components/Menu/CocktailDiv.component'

const collection_name = 'Cocktails'

const CocktailElement = () => {
	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				Cocktails
			</h2>
			<div className='flex flex-col justify-center gap-28'>
				<CocktailDivComponent
					order={1}
					collection={collection_name}
					isInverted={true}
				/>
				<CocktailDivComponent order={2} collection={collection_name} />
				<CocktailDivComponent
					order={3}
					collection={collection_name}
					isInverted={true}
				/>
				<CocktailDivComponent order={4} collection={collection_name} />
				<CocktailDivComponent
					order={5}
					collection={collection_name}
					isInverted={true}
				/>
			</div>
		</div>
	)
}

export default CocktailElement
