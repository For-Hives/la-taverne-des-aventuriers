import { getContactData } from '@/app/actions/getDatasService'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

export default async function MapSection() {
	const data = await getContactData()

	const ContactData = {
		address: data.address,
		adress_title: data.adress_title,
		button_label: data.button_label,
		button_url: data.button_url,
	}

	return (
		<div className='flex w-full items-center gap-8 font-obraletra text-title-200'>
			<div className='flex w-1/3 flex-col items-start gap-16 p-16'>
				<h1 className='font-cardinal text-6xl first-letter:text-title-100'>
					{ContactData.adress_title}
				</h1>
				<p className='w-2/3 text-5xl'>{ContactData.address}</p>
				<button className='flex w-1/3 items-center justify-center rounded bg-title-200 p-1 font-cardinal text-xl'>
					<Link
						target='_blank'
						href={ContactData.button_url}
						className='flex items-center gap-3 text-xl text-title-300'
					>
						{ContactData.button_label}
						<FontAwesomeIcon
							icon={faChevronRight}
							className='h-4 text-title-300'
						/>
					</Link>
				</button>
			</div>
			<div className='w-2/3'>
				<Image
					src='/assets/images/elements/HowtoContact.png'
					alt='LTDA Logo'
					width={300}
					height={300}
				/>
			</div>
		</div>
	)
}
