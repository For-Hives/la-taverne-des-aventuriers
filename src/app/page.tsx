import { Metadata } from 'next'

import { getEventListData } from '@/app/actions/services/getEventListData'
import { getLandingData } from '@/app/actions/services/getLandingPageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import LandingWrapper from '@/components/Landing/LandingWrapper'

export const revalidate = 10

export const metadata: Metadata = {
	alternates: {
		canonical: 'https://latavernedesaventuriers.fr',
	},
	description:
		'Bar à jeux médiéval-fantastique à Nantes. Venez découvrir plus de 90 jeux de société, cocktails créatifs et une ambiance unique.',
	openGraph: {
		description:
			'Bar à jeux médiéval à Nantes. Jeux de société, cocktails et ambiance chaleureuse dans un univers fantastique.',
		locale: 'fr_FR',
		siteName: 'La Taverne des Aventuriers',
		title: 'Bar à Jeux Médiéval | La Taverne des Aventuriers',
		type: 'website',
		url: 'https://latavernedesaventuriers.fr',
	},
}

export default async function Home() {
	const dataLanding = await getLandingData()
	const dataEvents = await getEventListData()
	const navItems = await getNavBarData()

	return (
		<LandingWrapper
			data={dataLanding}
			dataEvents={dataEvents}
			navItems={navItems}
		/>
	)
}
