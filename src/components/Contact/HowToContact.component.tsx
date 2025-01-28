import { getContactData } from '@/app/actions/services/getContactPageData.service'
import Image from 'next/image'

export default async function HowToContact() {
	// Fetch the contact data from the API
	const data = await getContactData()

	// Destructure the relevant fields from the fetched data
	const ContactData = {
		howtosection_description: data.howtosection_description,
		howtosection_image: data.howtosection_image,
		howtosection_title: data.howtosection_title,
	}

	return (
		<div className='flex w-3/4 items-center justify-center'>
			{/* Image Section */}
			<div className='flex w-1/3 items-center justify-end'>
				<Image
					src='/assets/images/elements/HowtoContact.png'
					alt='LTDA Logo'
					width={300}
					height={300}
				/>
			</div>

			{/* Text Section */}
			<div className='text-customBrown-100 flex w-2/3 flex-col items-start justify-center gap-10 font-obraletra text-base'>
				{/* Title */}
				<h1 className='first-letter:text-customRed-100 items-center justify-center text-center font-cardinal text-2xl'>
					{ContactData.howtosection_title}
				</h1>

				{/* Description (with HTML content) */}
				<div
					className='flex flex-col items-start gap-3 text-xs'
					dangerouslySetInnerHTML={{
						__html: ContactData.howtosection_description,
					}}
				></div>
			</div>
		</div>
	)
}
