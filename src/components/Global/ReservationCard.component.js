import Image from 'next/image'
import Link from 'next/link'

const ReservationCardComponent = () => {
	return (
		<div className='bg-cardBG-100 mx-auto flex w-3/4 items-center gap-20 rounded p-10 py-5'>
			<div className='items-left flex w-2/3 flex-col gap-9 p-8 font-obraletra text-base text-title-200'>
				<h1 className='text-left font-cardinal text-2xl first-letter:text-title-100'>
					Comment Réserver ?
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
					turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum et
					libero pretium viverra. Nullam sed lacus enim. Sed tincidunt tincidunt
					urna, in lacinia ipsum ullamcorper eu. Nunc tempus eget augue at
					interdum. Aliquam in maximus nisl. Duis accumsan venenatis dui,
					dignissim congue leo scelerisque in. Sed hendrerit efficitur viverra.
				</p>
				<div>
					<button className='rounded bg-amber-100 p-2'>
						<Link href='#' className='text-title-200 hover:underline'>
							Réservez
						</Link>
					</button>
				</div>
			</div>

			<div className='flex w-1/3 items-center justify-center'>
				<Image
					src='/assets/images/elements/ReservationCardIllustration.png'
					alt='LTDA Logo'
					width={300}
					height={200}
				/>
			</div>
		</div>
	)
}
export default ReservationCardComponent
