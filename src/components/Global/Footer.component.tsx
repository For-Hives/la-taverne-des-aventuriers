import { getFooterData } from '@/app/actions/services/getFooterData.service'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

export default async function FooterComponent() {
	// Fetch footer data asynchronously
	const data = await getFooterData()

	// Get current year
	const date = new Date().getFullYear()

	return (
		<div
			className='relative flex w-screen items-end justify-center bg-FooterImage bg-cover bg-center text-white sm:min-h-[550px] md:overflow-hidden'
			style={{ aspectRatio: '2653 / 1000' }}
		>
			{/* Left decorative image */}
			{/*<div className='absolute bottom-0 left-0 hidden !-translate-x-[15rem] items-center justify-center overflow-hidden mix-blend-color-burn lg:flex xl:-translate-x-[9rem] xl:translate-y-[3rem]'>*/}
			<div
				className={
					'absolute bottom-0 left-0 overflow-hidden mix-blend-color-burn'
				}
			>
				<Image
					src='/assets/images/elements/cristals/rock1.png'
					alt='Decorative rock'
					className='hidden transform lg:block lg:-translate-x-[15rem] lg:translate-y-[5rem] xl:w-3/4 xl:-translate-x-[10rem] 2xl:w-3/4'
					width={400}
					height={400}
				/>
			</div>

			{/* Main content container */}
			<div className='relative z-10 mt-36 flex w-full max-w-7xl flex-col items-center justify-center gap-12 p-10 text-left font-obraletra text-base text-customBrown-100 max-sm:gap-6 sm:mt-10 xl:gap-36'>
				<div className='flex w-full max-w-4xl flex-wrap items-start justify-evenly max-sm:flex-col max-sm:items-start max-sm:gap-9'>
					{/* Navigation column */}
					<div className='flex w-1/3 max-w-xs flex-col items-start justify-center gap-3 font-obraletra text-base text-customBrown-100 max-lg:text-sm max-sm:w-full'>
						<h2
							className='font-cardinal text-2xl text-customBrown-100 first-letter:text-customRed-100 sm:text-3xl'
							dangerouslySetInnerHTML={{
								__html: data.bar_title.replaceAll(' ', '&nbsp;'),
							}}
						/>
						<div className='flex flex-col gap-2 *:w-full'>
							<Link
								className='transition-all duration-300 ease-in-out hover:text-customRed-100 hover:underline'
								href={data.menu_url}
								aria-label={data.menu_aria}
							>
								{data.menu_link_title}
							</Link>
							<Link
								className='transition-all duration-300 ease-in-out hover:text-customRed-100 hover:underline'
								href={data.description_url}
								aria-label={data.description_aria}
							>
								{data.description_title}
							</Link>
							<Link
								className='transition-all duration-300 ease-in-out hover:text-customRed-100 hover:underline'
								href={data.events_url}
								aria-label={data.event_aria}
							>
								{data.events_title}
							</Link>
							<Link
								className='transition-all duration-300 ease-in-out hover:text-customRed-100 hover:underline'
								href={data.game_library_url}
								aria-label={data.game_library_aria}
							>
								{data.game_library_title}
							</Link>
						</div>
					</div>

					{/* Support column */}
					<div className='flex w-1/3 max-w-xs flex-col items-start justify-center gap-3 font-obraletra text-base text-customBrown-100 max-lg:text-sm max-sm:w-full'>
						<h2
							className='font-cardinal text-2xl text-customBrown-100 first-letter:text-customRed-100 sm:text-3xl'
							dangerouslySetInnerHTML={{
								__html: data.support_title.replaceAll(' ', '&nbsp;'),
							}}
						/>
						<div className='flex flex-col gap-2 *:w-full'>
							<Link
								className='transition-all duration-300 ease-in-out hover:text-customRed-100 hover:underline'
								href={data.contact_url}
								aria-label={data.contact_aria}
							>
								{data.contact_title}
							</Link>
							<Link
								className='transition-all duration-300 ease-in-out hover:text-customRed-100 hover:underline'
								href={data.reservation_url}
								aria-label={data.reservation_aria}
							>
								{data.reservation_link_label}
							</Link>
							<Link
								className='transition-all duration-300 ease-in-out hover:text-customRed-100 hover:underline'
								href='/mentions-legales'
							>
								Mentions légales
							</Link>
						</div>
					</div>

					{/* Social media column */}
					<div className='flex w-1/3 max-w-xs flex-col items-start justify-center gap-3 max-sm:w-full'>
						<h2
							className='font-cardinal text-2xl text-customBrown-100 first-letter:text-customRed-100 sm:text-3xl'
							dangerouslySetInnerHTML={{
								__html: data.socials_title.replaceAll(' ', '&nbsp;'),
							}}
						/>
						<div className='flex w-full items-center justify-start space-x-4 max-md:text-sm md:gap-8'>
							<Link
								className='transition-transform duration-300 ease-in-out hover:scale-110'
								target='_blank'
								href={data.instagram_url}
								aria-label={data.instagram_aria}
							>
								<FontAwesomeIcon
									icon={faInstagram}
									className='h-8 w-8 text-customBrown-100 transition-colors duration-300 ease-in-out hover:text-customRed-100'
								/>
							</Link>
							<Link
								className='transition-transform duration-300 ease-in-out hover:scale-110'
								target='_blank'
								href={data.facebook_url}
								aria-label={data.facebook_aria}
							>
								<FontAwesomeIcon
									icon={faFacebook}
									className='h-8 w-8 text-customBrown-100 transition-colors duration-300 ease-in-out hover:text-customRed-100'
								/>
							</Link>
							<Link
								className='transition-transform duration-300 ease-in-out hover:scale-110'
								target='_blank'
								href={data.myludo_url}
								aria-label={data.myludo_aria}
							>
								<Image
									src='/assets/images/elements/ContactElements/myludo_icon.png'
									alt='MyLudo Icon'
									className='h-8 w-8 transition-transform duration-300'
									width={200}
									height={200}
								/>
							</Link>
						</div>
					</div>
				</div>

				{/* Copyright section */}
				<div className='flex w-full max-w-5xl flex-col items-center justify-center'>
					{/*	todo: lien temporaire le temps que je modifie le site de ForHives pour améliorer les CTA etc, et mettre en avant que c'est plus une agence */}
					<p className='mt-4 text-sm max-md:text-sm'>
						{`© ${date} La taverne des Aventuriers - Tous droits réservés - Developed & Designed with ❤️ by `}
						<Link
							className={'underline'}
							href={'https://andy-cinquin.fr/'}
							aria-label={'découvrez notre équipe de développeurs'}
						>
							Andy Cinquin
						</Link>
					</p>
				</div>
			</div>

			{/* Right decorative image */}
			<div className='absolute bottom-0 right-0 flex -rotate-6 items-center justify-center overflow-hidden mix-blend-color-burn max-lg:hidden max-lg:translate-x-[1rem] max-lg:translate-y-[1rem] lg:translate-y-[2.5rem] lg:scale-125 xl:translate-x-[7rem] xl:translate-y-[2rem] xl:scale-100'>
				<Image
					src='/assets/images/elements/cristals/rock2.png'
					alt='Decorative rock'
					className='w-40 xl:w-2/3'
					width={300}
					height={300}
				/>
			</div>
		</div>
	)
}
