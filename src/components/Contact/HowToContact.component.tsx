import { ContactPageData } from '@/app/actions/services/getContactPageData.service'
import Image from 'next/image'

export default async function HowToContact({
	data,
}: Readonly<{
	data: ContactPageData
}>) {
	return (
		<div className='flex w-3/4 items-center justify-center'>
			{/* Image Section */}
			<div className='flex w-1/3 items-center justify-end'>
				<Image
					src='/assets/images/elements/HowtoContact.png'
					alt='Howto Contact image'
					width={300}
					height={300}
				/>
			</div>

			{/* Text Section */}
			<div className='flex w-2/3 flex-col items-start justify-center gap-10 font-obraletra text-base text-customBrown-100'>
				{/* Title */}
				<h1 className='items-center justify-center text-center font-cardinal text-2xl first-letter:text-customRed-100'>
					{data.howtosection_title}
				</h1>

				{/* Description (with HTML content) */}
				<div
					className='flex flex-col items-start gap-3 text-xs'
					dangerouslySetInnerHTML={{
						__html: data.howtosection_description,
					}}
				></div>
			</div>
		</div>
	)
}
