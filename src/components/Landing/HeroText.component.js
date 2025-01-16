import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const HeroTextComponent = () => {
	return (
		<div className='bottom-0 left-0 flex flex-col items-start gap-10 p-52'>
			{/*Hero Title*/}
			<h1 className='flex flex-col gap-2'>
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
					<span className='font-obraletra text-2xl text-title-200'>
						Votre bar à{' '}
					</span>
					<span className='font-obraletra text-2xl text-title-100'>
						Jeux Nantais
					</span>
					<span className='font-obraletra text-2xl text-title-200'>
						favoris !
					</span>
				</p>

				{/*Button div*/}
				<div className='flex flex-wrap items-start gap-6'>
					{/*Button 1*/}
					<button className='font-obraletra flex items-center gap-4 rounded bg-title-200 p-2 text-xl text-title-300'>
						<Link href='/menu' className='hover:underline'>
							Servez-vous
							<FontAwesomeIcon
								icon={faChevronRight}
								className='text-title-300'
							/>
						</Link>
					</button>

					{/*Button 2*/}
					<button className='font-obraletra rounded border-3 border-solid border-title-200 p-1 text-xl text-title-200'>
						<Link href='/gamelibrary' className='hover:underline'>
							Découvrez nos Jeux
						</Link>
					</button>
				</div>
			</div>
		</div>
	)
}
export default HeroTextComponent
