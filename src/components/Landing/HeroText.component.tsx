'use client'
import { getData } from '@/app/actions/GetLandingService'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const HeroTextComponent = () => {
	const [heroData, setHeroData] = useState({
		heroDescription: '',
		heroLeftButtonLabel: '',
		heroLeftButtonUrl: '',
		heroRightButtonLabel: '',
		heroRightButtonUrl: '',
		heroTitle: '',
	})
	const [error] = useState(null)

	useEffect(() => {
		async function fetchHeroData() {
			try {
				const data = await getData()
				const heroElement = data[0]

				setHeroData({
					heroDescription:
						heroElement?.hero_description || 'Description indisponible',
					heroLeftButtonLabel:
						heroElement?.hero_left_button_label || 'boutton indisponible',
					heroLeftButtonUrl: heroElement?.hero_left_button_url,
					heroRightButtonLabel:
						heroElement?.hero_right_button_label || 'boutton indisponible',
					heroRightButtonUrl: heroElement?.hero_right_button_url,
					heroTitle: heroElement?.hero_title || 'Titre indisponible',
				})
			} catch (err) {
				console.error('Erreur lors de la récupération des données :', err)
			}
		}
		fetchHeroData()
	}, [])

	if (error) {
		return <div className='text-red-500'>{error}</div>
	}

	return (
		<div className='bottom-0 left-0 flex flex-col items-start gap-10 p-52'>
			{/*Hero Title*/}
			<h1 className='flex w-2/3 flex-col gap-2 font-cardinal text-8xl font-bold text-title-200 first-letter:text-title-100'>
				{heroData.heroTitle}
			</h1>

			<div className='flex flex-col items-start gap-9'>
				{/*Description*/}
				<p className='flex items-center gap-1 font-obraletra text-2xl text-title-200'>
					{heroData.heroDescription}
				</p>

				{/*Button div*/}
				<div className='flex flex-wrap items-start gap-6'>
					{/*Button 1*/}
					<button className='flex items-center gap-4 rounded bg-title-200 p-2 font-obraletra text-xl text-title-300'>
						<Link href={heroData.heroLeftButtonUrl} className='hover:underline'>
							{heroData.heroLeftButtonLabel}
							<FontAwesomeIcon
								icon={faChevronRight}
								className='text-title-300'
							/>
						</Link>
					</button>

					{/*Button 2*/}
					<button className='rounded border-3 border-solid border-title-200 p-1 font-obraletra text-xl text-title-200'>
						<Link
							href={heroData.heroRightButtonUrl}
							className='hover:underline'
						>
							{heroData.heroRightButtonLabel}
						</Link>
					</button>
				</div>
			</div>
		</div>
	)
}

export default HeroTextComponent
