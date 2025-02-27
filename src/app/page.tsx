import { getEventListData } from '@/app/actions/services/getEventListData'
import { getLandingData } from '@/app/actions/services/getLandingPageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import LandingWrapper from '@/components/Landing/LandingWrapper'
import { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
	alternates: {
		canonical: 'https://latavernedesaventuriers.fr',
	},
	description:
		'Bienvenue à La Taverne des Aventuriers, votre bar à jeux médiéval-fantastique à Nantes. Découvrez notre collection unique de jeux de société, nos cocktails créatifs et notre ambiance chaleureuse.',
	openGraph: {
		description:
			'Bar à jeux médiéval-fantastique à Nantes. Plus de 90 jeux de société, cocktails créatifs et soirées thématiques dans une ambiance unique.',
		locale: 'fr_FR',
		siteName: 'La Taverne des Aventuriers',
		title: 'Accueil | La Taverne des Aventuriers',
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
