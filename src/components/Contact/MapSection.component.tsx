import { ContactPageData } from '@/app/actions/services/getContactPageData.service'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

export default async function MapSection({
	data,
}: Readonly<{ data: ContactPageData }>) {
	return (
		<div
			className='flex w-full flex-col items-center gap-8 p-8 font-obraletra text-customBrown-100 lg:flex-row lg:p-16'>
			{/* Text Section */}
			<div className='flex w-full flex-col items-start gap-8 lg:w-1/3'>
				{/* Title of the address */}
				<h1 className='font-cardinal text-4xl first-letter:text-customRed-100 lg:text-6xl'>
					{data.adress_title}
				</h1>
				{/* Address */}
				<p className='text-xl lg:text-3xl'>{data.address}</p>
				{/* Button linking to the URL */}
				<Link
					target='_blank'
					href={data.button_url}
					className='flex items-center justify-center gap-3 rounded bg-customBrown-100 p-3 font-cardinal text-lg text-customWhite-100 transition hover:bg-customWhite-100 lg:text-xl'
				>
					{data.button_label}
					{/* Chevron icon for the button */}
					<FontAwesomeIcon icon={faChevronRight} className='h-4 lg:h-5' />
				</Link>
			</div>

			{/* Image Section */}
			<div className="relative w-full lg:w-2/3 maskMap">
				{/* Image pour petits écrans */}
				<div className="block lg:hidden">
					<Image
						src='/assets/images/map2.png'
						alt='Map for small screens'
						width={1920}
						height={1080}
						className='h-auto w-full rounded-lg shadow-md object-cover'  /* Image remplissant son conteneur */
					/>
				</div>

				{/* Image pour grands écrans */}
				<div className="hidden lg:block">
					<Image
						src='/assets/images/map.png'
						alt='Map for large screens'
						width={1920}
						height={1080}
						className='h-auto w-full rounded-lg shadow-md object-cover'  /* Image remplissant son conteneur */
					/>
				</div>
			</div>

		</div>
	)
}
