import { ContactPageData } from '@/app/actions/services/getContactPageData.service'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

export default async function ContactElements({
	data,
}: Readonly<{
	data: ContactPageData
}>) {
	return (
		<div className='flex w-3/4 items-center justify-center gap-8 p-8 max-xl:flex-col'>
			{/* Grid Layout for Contact Sections */}
			<div className='grid w-1/2 max-w-6xl grid-cols-1 gap-8 max-xl:w-full xl:grid-cols-2'>
				{/* Bloc Horaires (Business Hours) */}
				<div className='flex flex-col items-start gap-6 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 font-obraletra shadow'>
					<h1 className='font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
						{data.schedules_title}
					</h1>
					<p className='text-customBrown-100 [&>span]:block font-cardoRegular'>
						{/* Exceptional Schedule */}
						<span>
							{data.schedules_exceptional}
						</span>
						{/* Days of the week */}
						<span>{data.schedules_monday}</span>
						<span>{data.schedules_tuesday}</span>
						<span>{data.schedules_wednesday}</span>
						<span>{data.schedules_thursday}</span>
						<span>{data.schedules_friday}</span>
						<span>{data.schedules_saturday}</span>
						<span>{data.schedules_sunday}</span>
					</p>
				</div>

				{/* Bloc Contact et Email (Contact and Email) */}
				<div className='flex flex-col gap-6 font-obraletra'>
					{/* Bloc Contact (Social Media) */}
					<div className='flex flex-col items-center gap-4 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 shadow'>
						<h2 className='w-full font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
							{data.contact_socials_title}
						</h2>
						<div className='flex items-center justify-evenly gap-10'>
							{/* Facebook Icon */}
							<div className='flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400'>
								<FontAwesomeIcon
									icon={faFacebook}
									className='h-8 w-8 text-customBrown-100'
								/>
							</div>
							{/* Custom Icon (e.g., logo) */}
							<div className='flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400'>
								<Image
									src='/assets/images/elements/ContactElements/myludo_icon.png'
									alt='MyLudo Icon'
									className='h-8 w-8'
									width={200}
									height={200}
								/>
							</div>
							{/* Instagram Icon */}
							<div className='flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400'>
								<FontAwesomeIcon
									icon={faInstagram}
									className='h-8 w-8 text-customBrown-100'
								/>
							</div>
						</div>
					</div>

					{/* Bloc Email */}
					<div className='relative flex flex-col gap-6 font-obraletra'>
						{/* Email Section */}
						<div className='flex flex-col items-start gap-4 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 shadow'>
							<h2 className='font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
								{data.contact_email_title}
							</h2>
							<p className='text-customBrown-100 font-cardoRegular'>{data.email}</p>
						</div>
						{/* Decorative Image */}
						<div className='relative'>
							<Image
								src='/assets/images/elements/ContactElements/petite_bestiole.png'
								alt='Petite Bestiole'
								className='absolute bottom-[-3vh] -z-20 right-0 h-20 w-20 object-contain'
								width={80}
								height={80}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Decorative Images (Dragon, Runes) */}
			<div className='relative flex w-1/2 justify-end max-xl:w-full max-xl:justify-center'>
				<Image
					src='/assets/images/elements/ContactElements/runes.png'
					alt='Runes'
					className='absolute left-20 top-[-4vh] h-1/4 w-1/4 object-contain'
					width={150}
					height={150}
				/>
				<Image
					src='/assets/images/elements/ContactElements/dragon.png'
					alt='Dragon'
					className='h-1/2 w-1/2 max-xl:h-fit max-xl:w-1/3 max-lg:w-1/2'
					width={400}
					height={400}
				/>
			</div>
		</div>
	)
}
