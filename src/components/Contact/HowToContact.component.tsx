import { getContactData } from '@/app/actions/getContactData'
import Image from 'next/image'

export default async function HowToContact() {
	const data = await getContactData()

	const ContactData = {
		howtosection_description: data.howtosection_description,
		howtosection_image: data.howtosection_image,
		howtosection_title: data.howtosection_title,
	}

	return (
		<div className='flex w-3/4 items-center justify-center'>
			<div className='flex w-1/3 items-center justify-end'>
				<Image
					src='/assets/images/elements/HowtoContact.png'
					alt='LTDA Logo'
					width={300}
					height={300}
				/>
			</div>

			<div className='flex w-2/3 flex-col items-start justify-center gap-10 font-obraletra text-base text-title-200'>
				<h1 className='items-center justify-center text-center font-cardinal text-2xl first-letter:text-title-100'>
					{ContactData.howtosection_title}
				</h1>

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
