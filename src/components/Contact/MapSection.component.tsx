import { getContactData } from '@/app/actions/services/getContactPageData.service'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

export default async function MapSection() {
	// Fetch contact data
	const data = await getContactData()

	// Structure the contact data into variables for easier access
	const ContactData = {
		address: data.address,
		adress_title: data.adress_title,
		button_label: data.button_label,
		button_url: data.button_url,
	}

	return (
		<div className='text-customBrown-100 flex w-full flex-col items-center gap-8 p-8 font-obraletra lg:flex-row lg:p-16'>
			{/* Text Section */}
			<div className='flex w-full flex-col items-start gap-8 lg:w-1/3'>
				{/* Title of the address */}
				<h1 className='first-letter:text-customRed-100 font-cardinal text-4xl lg:text-6xl'>
					{ContactData.adress_title}
				</h1>
				{/* Address */}
				<p className='text-xl lg:text-3xl'>{ContactData.address}</p>
				{/* Button linking to the URL */}
				<Link
					target='_blank'
					href={ContactData.button_url}
					className='bg-customBrown-100 text-customWhite-100 hover:bg-customWhite-100 flex items-center justify-center gap-3 rounded p-3 font-cardinal text-lg transition lg:text-xl'
				>
					{ContactData.button_label}
					{/* Chevron icon for the button */}
					<FontAwesomeIcon icon={faChevronRight} className='h-4 lg:h-5' />
				</Link>
			</div>

			{/* Image Section */}
			<div className='relative w-full lg:w-2/3'>
				{/* Image for small screens */}
				<div className='block lg:hidden'>
					<Image
						src='/assets/images/map2.png'
						alt='Map for small screens'
						width={1920}
						height={1080}
						className='h-auto w-full rounded-lg shadow-md'
					/>
				</div>

				{/* Image for large screens */}
				<div className='hidden lg:block'>
					<Image
						src='/assets/images/map.png'
						alt='Map for large screens'
						width={1920}
						height={1080}
						className='h-auto w-full rounded-lg shadow-md'
					/>
				</div>
			</div>
		</div>
	)
}
