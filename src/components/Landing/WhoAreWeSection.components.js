import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

const WhoAreWeSection = () => {
	return (
		<div className='flex w-3/4 items-center justify-center gap-16 rounded'>
			<div className='flex w-1/3 items-center justify-center'>
				{/*Image*/}
				<Image
					src='/assets/images/elements/ImageLPReservations.png'
					alt='Vinbieres'
					width={300}
					height={300}
				/>
			</div>

			{/*Text*/}
			<div className='flex w-2/3 flex-col items-start justify-center gap-9 p-4 font-obraletra text-title-200'>
				{/*title*/}
				<h2>{`D'où vient notre renom ?`}</h2>

				{/*Description*/}
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
					turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum et
					libero pretium viverra. Nullam sed lacus enim. Sed tincidunt tincidunt
					urna, in lacinia ipsum ullamcorper eu. Nunc tempus eget augue at
					interdum. Aliquam in maximus nisl. Duis accumsan venenatis dui,
					dignissim congue leo scelerisque in. Sed hendrerit efficitur viverra.
				</p>

				{/* Link */}
				<div>
					<Link href='/' className='flex items-center gap-3 underline'>
						<span>Read More</span>
						<FontAwesomeIcon icon={faChevronRight} className='text-title-200' />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default WhoAreWeSection
