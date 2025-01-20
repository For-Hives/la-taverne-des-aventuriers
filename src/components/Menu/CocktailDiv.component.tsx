import Image from 'next/image'

interface CocktailDivComponentProps {
	isInverted?: boolean
}

const CocktailDivComponent = ({
	isInverted = false,
}: CocktailDivComponentProps) => {
	return (
		<div className={`flex flex-col items-center justify-center`}>
			<div
				className={`flex items-center justify-center ${isInverted ? 'flex-row-reverse' : 'flex-row'}`}
			>
				<div className='w-1/3'>
					<Image
						src='/assets/images/Cocktails/Cocktail1.jpg'
						alt='LTDA Logo'
						className='rounded'
						width={400}
						height={400}
					/>
				</div>
				<div className='flex w-2/3 flex-col gap-9'>
					<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100'>
						Titre du Cocktail
					</h2>
					<p className='font-obraletra text-xs text-title-200'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
						turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum
						et libero pretium viverra. Nullam sed lacus enim. Sed tincidunt
						tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc tempus eget
						augue at interdum. Aliquam in maximus nisl. Duis accumsan venenatis
						dui, dignissim congue leo scelerisque in. Sed hendrerit efficitur
						viverra.
					</p>
				</div>
			</div>
		</div>
	)
}
export default CocktailDivComponent
