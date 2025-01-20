import CocktailDivComponent from '@/components/Menu/CocktailDiv.component'

const PlanchElement = () => {
	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				Les Planches
			</h2>
			<div className='flex flex-col justify-center gap-28'>
				<CocktailDivComponent />
				<CocktailDivComponent isInverted={true} />
				<CocktailDivComponent />
			</div>
		</div>
	)
}

export default PlanchElement
