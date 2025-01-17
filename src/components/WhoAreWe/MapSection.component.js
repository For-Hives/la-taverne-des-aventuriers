import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const MapSection = () => {
	return (
		<div className='flex w-3/4 items-center gap-8 font-obraletra text-title-200'>
			<div className='flex w-1/3 flex-col items-start gap-16'>
				<h1 className='font-cardinal text-6xl first-letter:text-title-100'>
					Adresse
				</h1>
				<p className='text-5xl'>13 rue Kergévan, 44000 Nantes</p>
				<button className='flex w-1/2 items-center justify-center rounded bg-title-200 p-1 font-cardinal text-xl'>
					<Link
						href='mailto:adresse@gmail.com'
						className='flex items-center gap-3 text-xl text-title-300'
					>
						Google Maps
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 text-title-300'
						/>
					</Link>
				</button>
			</div>
			<div className='w-2/3'>test</div>
		</div>
	)
}

export default MapSection
