import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ContactElements = () => {
	return (
		<div className='flex w-3/4 gap-20 font-obraletra text-base text-title-200'>
			<div className='flex w-1/3 flex-col items-start justify-center gap-9'>
				<h1 className='text-2xl first-letter:text-title-100'>Horaires :</h1>
				<p className='flex flex-col'>
					<span>Exceptionnel: le 1 mai, nous sommes ouvert</span>
					<span>Lundi: 18:00–00:00</span>
					<span>Mardi: Fermé </span>
					<span>Mercredi: 15:00–00:00</span>
					<span>Jeudi: 18:00–00:00 </span>
					<span>Vendredi: 18:00–01:00 </span>
					<span>Samedi: 15:00–01:00 </span>
					<span>Dimanche: 15:00–00:00</span>
				</p>
			</div>

			<div className='flex w-1/3 flex-col items-start gap-6'>
				<h2 className='text-2xl first-letter:text-title-100'>Contact</h2>

				<div className='flex w-full items-center justify-center gap-3'>
					{/* Conteneur Facebook */}
					<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-300'>
						<FontAwesomeIcon
							icon={faFacebook}
							className='h-5 w-5 text-title-200'
						/>
					</div>
					{/* Conteneur Instagram */}
					<div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-300'>
						<FontAwesomeIcon
							icon={faInstagram}
							className='h-5 w-5 text-title-200'
						/>
					</div>
				</div>
			</div>

			<div className='flex w-1/3 flex-col items-start gap-9'>
				<h2 className='text-2xl first-letter:text-title-100'>Email</h2>
				<p>latavernedesaventuriers44@gmail.com</p>
			</div>
		</div>
	)
}

export default ContactElements
