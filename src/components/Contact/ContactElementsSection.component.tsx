import { getContactData } from '@/app/actions/getContactData'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

export default async function ContactElements() {
	const data = await getContactData()

	const ContactData = {
		contact_email_title: data.contact_email_title,
		contact_socials_title: data.contact_socials_title,
		email: data.email,
		schedules_exceptional: data.schedules_exceptional,
		schedules_friday: data.schedules_friday,
		schedules_monday: data.schedules_monday,
		schedules_saturday: data.schedules_saturday,
		schedules_sunday: data.schedules_sunday,
		schedules_thursday: data.schedules_thursday,
		schedules_title: data.schedules_title,
		schedules_tuesday: data.schedules_tuesday,
		schedules_wednesday: data.schedules_wednesday,
	}

	return (
		<div className='flex w-3/4 items-center justify-center gap-8 p-8 max-xl:flex-col'>
			<div className='grid w-1/2 max-w-6xl grid-cols-1 gap-8 max-xl:w-full xl:grid-cols-2'>
				{/* Bloc Horaires */}
				<div className='flex flex-col items-start gap-6 rounded-lg border border-title-200 bg-title-600 p-6 font-obraletra shadow'>
					<h1 className='font-obraletra text-2xl text-title-200 first-letter:font-obraletraBold'>
						{ContactData.schedules_title}
					</h1>
					<p className='text-title-200'>
						<span className='block font-obraletraBold'>
							{ContactData.schedules_exceptional}
						</span>
						<span className='block'>{ContactData.schedules_monday}</span>
						<span className='block'>{ContactData.schedules_tuesday}</span>
						<span className='block'>{ContactData.schedules_wednesday}</span>
						<span className='block'>{ContactData.schedules_thursday}</span>
						<span className='block'>{ContactData.schedules_friday}</span>
						<span className='block'>{ContactData.schedules_saturday}</span>
						<span className='block'>{ContactData.schedules_sunday}</span>
					</p>
				</div>

				{/* Bloc Contact et Email */}
				<div className='flex flex-col gap-6 font-obraletra'>
					{/* Bloc Contact */}
					<div className='flex flex-col items-center gap-4 rounded-lg border border-title-200 bg-title-600 p-6 shadow'>
						<h2 className='w-full font-obraletra text-2xl text-title-200 first-letter:font-obraletraBold'>
							{ContactData.contact_socials_title}
						</h2>
						<div className='flex items-center justify-evenly gap-10'>
							{/* Icone Facebook */}
							<div className='flex h-12 w-12 items-center justify-center rounded-full bg-title-700'>
								<FontAwesomeIcon
									icon={faFacebook}
									className='h-8 w-8 text-title-200'
								/>
							</div>
							<div className='flex h-12 w-12 items-center justify-center rounded-full bg-title-700'>
								<Image
									src='/assets/images/elements/ContactElements/myludo_icon.png'
									alt='LTDA Logo'
									className='h-8 w-8'
									width={200}
									height={200}
								/>
							</div>
							{/* Icone Instagram */}
							<div className='flex h-12 w-12 items-center justify-center rounded-full bg-title-700'>
								<FontAwesomeIcon
									icon={faInstagram}
									className='h-8 w-8 text-title-200'
								/>
							</div>
						</div>
					</div>

					{/* Bloc Email */}
					<div className='relative flex flex-col gap-6 font-obraletra'>
						<div className='flex flex-col items-start gap-4 rounded-lg border border-title-200 bg-title-600 p-6 shadow'>
							<h2 className='font-obraletra text-2xl text-title-200 first-letter:font-obraletraBold'>
								{ContactData.contact_email_title}
							</h2>
							<p className='text-title-200'>{ContactData.email}</p>
						</div>
						{/* Ajout de l'image positionnée en bas à droite */}
						<div className='relative'>
							<Image
								src='/assets/images/elements/ContactElements/petite_bestiole.png'
								alt='Petite Bestiole'
								className='absolute bottom-[-30px] right-0 h-20 w-20 object-contain'
								width={80}
								height={80}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='relative flex w-1/2 justify-end max-xl:w-full max-xl:justify-center'>
				<Image
					src='/assets/images/elements/ContactElements/runes.png'
					alt='Runes'
					className='absolute left-20 top-[-50px] h-1/4 w-1/4 object-contain'
					width={150}
					height={150}
				/>
				<Image
					src='/assets/images/elements/ContactElements/dragon.png'
					alt='LTDA Logo'
					className='h-1/2 w-1/2 max-xl:h-fit max-xl:w-1/3 max-lg:w-1/2'
					width={400}
					height={400}
				/>
			</div>
		</div>
	)
}
