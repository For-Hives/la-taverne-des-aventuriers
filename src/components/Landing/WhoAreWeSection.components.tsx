// 'use client'
//
// import { getLandingData } from '@/app/actions/GetLandingService'
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useEffect, useState } from 'react'
//
// const WhoAreWeSection = () => {
// 	const [Element, setElement] = useState({
// 		descriptionButtonLabel: '',
// 		descriptionButtonUrl: '',
// 		descriptionText: '',
// 		descriptionTitle: '',
// 	})
// 	const [error] = useState(null)
//
// 	useEffect(() => {
// 		async function fetchElement() {
// 			try {
// 				const data = await getLandingData()
// 				const Element = data[0]
// 				setElement({
// 					descriptionButtonLabel:
// 						Element?.description_button_label || 'Boutton Indisponible',
// 					descriptionButtonUrl: Element?.description_button_url,
// 					descriptionText: Element?.description_text || 'Texte Indisponible',
// 					descriptionTitle: Element?.description_title || 'Titre Indisponible',
// 				})
// 			} catch (err) {
// 				console.error('Erreur lors de la récupération des données :', err)
// 			}
// 		}
// 		fetchElement()
// 	}, [])
//
// 	if (error) {
// 		return <div className='text-red-500'>{error}</div>
// 	}
//
// 	return (
// 		<div className='flex w-3/4 items-center justify-center gap-16 rounded'>
// 			<div className='flex w-1/3 items-center justify-center'>
// 				{/*Image*/}
// 				<Image
// 					src='/assets/images/elements/ImageLPReservations.png'
// 					alt='Vinbieres'
// 					width={300}
// 					height={300}
// 				/>
// 			</div>
//
// 			{/*Text*/}
// 			<div className='flex w-2/3 flex-col items-start justify-center gap-9 p-4 font-obraletra text-title-200'>
// 				{/*title*/}
// 				<h2>{Element.descriptionTitle}</h2>
//
// 				{/*Description*/}
// 				<p>{Element.descriptionText}</p>
//
// 				{/* Link */}
// 				<div>
// 					<Link
// 						href={Element.descriptionButtonUrl}
// 						className='flex items-center gap-3 underline'
// 					>
// 						<span>{Element.descriptionButtonLabel}</span>
// 						<FontAwesomeIcon
// 							icon={faChevronRight}
// 							className='h-4 w-4 text-title-200'
// 						/>
// 					</Link>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
//
// export default WhoAreWeSection
