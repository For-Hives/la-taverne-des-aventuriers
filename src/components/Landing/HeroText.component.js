import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeroTextComponent = () => {
	return (
		<div className='bottom-0 left-0 flex flex-col items-start gap-10'>
			{/*Hero Title*/}
			<h1>
				<span className='font-cardinal text-8xl font-bold text-title-200'>
					La taverne des
				</span>
				<span className='font-cardinal text-8xl font-bold text-title-200 first-letter:text-title-100'>
					Aventuriers
				</span>
			</h1>

			<div className='flex flex-col items-start gap-9'>
				{/*Description*/}
				<p className='flex items-center gap-1'>
					<span className='font-kcobraletra text-2xl text-title-200'>
						Votre bar à{' '}
					</span>
					<span className='font-kcobraletra text-2xl text-title-100'>
						Jeux Nantais
					</span>
					<span className='font-kcobraletra text-2xl text-title-200'>
						favoris !
					</span>
				</p>

				{/*Button div*/}
				<div className='flex flex-wrap items-start gap-6'>
					{/*Button 1*/}
					<button className='flex items-center gap-4 rounded bg-title-200 p-2 font-kcobraletra text-xl text-title-300'>
						Servez-vous
						<FontAwesomeIcon icon={faChevronRight} className='text-title-300' />
					</button>

					{/*Button 2*/}
					<button className='rounded border-3 border-solid border-title-200 p-1 font-kcobraletra text-xl text-title-200'>
						Découvrez nos Jeux
					</button>
				</div>
			</div>
		</div>
	)
}
export default HeroTextComponent
