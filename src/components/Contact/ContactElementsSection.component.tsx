import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

const ContactElements = () => {
	return (
		<div className='flex w-3/4 items-center justify-center gap-8 p-8 max-xl:flex-col'>
			<div className='grid w-1/2 max-w-6xl grid-cols-1 gap-8 max-xl:w-full xl:grid-cols-2'>
				{/* Bloc Horaires */}
				<div className='flex flex-col items-start gap-6 rounded-lg border border-title-200 bg-title-600 p-6 font-obraletra shadow'>
					<h1 className='text-2xl font-bold text-title-200'>Horaires :</h1>
					<p className='text-title-200'>
						<span className='block'>
							Exceptionnel: le 1 mai, nous sommes ouvert
						</span>
						<span className='block'>Lundi: 18:00–00:00</span>
						<span className='block'>Mardi: Fermé </span>
						<span className='block'>Mercredi: 15:00–00:00</span>
						<span className='block'>Jeudi: 18:00–00:00 </span>
						<span className='block'>Vendredi: 18:00–01:00 </span>
						<span className='block'>Samedi: 15:00–01:00 </span>
						<span className='block'>Dimanche: 15:00–00:00</span>
					</p>
				</div>

				{/* Bloc Contact et Email */}
				<div className='flex flex-col gap-6 font-obraletra'>
					{/* Bloc Contact */}
					<div className='flex flex-col items-center gap-4 rounded-lg border border-title-200 bg-title-600 p-6 shadow'>
						<h2 className='w-full text-2xl font-bold text-title-200'>
							Contact
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
							<h2 className='text-2xl font-bold text-title-200'>Email</h2>
							<p className='text-title-200'>
								latavernedesaventuriers44@gmail.com
							</p>
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

export default ContactElements
