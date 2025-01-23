import CocktailDivComponent from '@/components/Menu/CocktailDiv.component'

const ShooterElement = () => {
	return (
		<div className='flex w-3/4 flex-col items-center justify-center gap-20'>
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				Shooters
			</h2>
			<div className='flex flex-col justify-center gap-28'>
				<CocktailDivComponent order={0} />
				<CocktailDivComponent order={0} isInverted={true} />
				<CocktailDivComponent order={0} />
			</div>
		</div>
	)
}

export default ShooterElement
