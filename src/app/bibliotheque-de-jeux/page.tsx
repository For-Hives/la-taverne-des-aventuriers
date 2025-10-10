import { getNavBarData } from '@/app/actions/services/getNavData.service'
import GameComponent from '@/components/GameLibrary/Games.component'
import GLHeroComponent from '@/components/GameLibrary/GLHero.component'
import MyLudoComponent from '@/components/GameLibrary/MyLudo.component'
import FooterComponent from '@/components/Global/Footer.component'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { Metadata } from 'next'

import { getGamePageData } from '../actions/services/getGamePageData.service'

export const revalidate = 10

/**
 * Generates metadata for the game library page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/bibliotheque-de-jeux',
		},
		description:
			'Découvrez notre collection de plus de 90 jeux de société à Nantes. Des grands classiques aux nouveautés, venez jouer dans une ambiance médiévale unique.',
		keywords: [
			'jeux de société Nantes',
			'bar à jeux',
			'Donjons et Dragons',
			'Just One',
			'Les Colons de Catane',
			'jeux de rôle',
			'ludothèque Nantes',
			'bar jeux de société',
		],
		robots: {
			follow: true,
			googleBot: {
				follow: true,
				index: true,
				'max-image-preview': 'large',
				'max-snippet': -1,
				'max-video-preview': -1,
			},
			index: true,
			nocache: true,
		},
		title: 'Ludothèque | La Taverne des Aventuriers',
	}
}

export default async function Page() {
	const dataGameLibrary = await getGamePageData()
	const navItems = await getNavBarData()

	// Structured data for better SEO
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		description: dataGameLibrary.games_hero_description,
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: [
				{
					'@type': 'Game',
					description: dataGameLibrary.card1_description,
					name: dataGameLibrary.card1_title,
					url: dataGameLibrary.card1_button_url,
				},
				{
					'@type': 'Game',
					description: dataGameLibrary.card2_description,
					name: dataGameLibrary.card2_title,
					url: dataGameLibrary.card2_button_url,
				},
				{
					'@type': 'Game',
					description: dataGameLibrary.card3_description,
					name: dataGameLibrary.card3_title,
					url: dataGameLibrary.card3_button_url,
				},
			],
			numberOfItems: 90,
		},
		name: dataGameLibrary.games_hero_title,
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<div className='flex min-h-screen flex-col'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='mask-custom bg-background-image absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform opacity-75'></div>

				{/* Main content with spacing between sections */}
				<div className='mt-64 flex w-full flex-col items-center justify-center gap-44 max-lg:gap-24'>
					<GLHeroComponent data={dataGameLibrary} />
					<div className='flex w-full flex-col items-center justify-center gap-44 max-lg:gap-24'>
						<GameComponent data={dataGameLibrary} />
						<MyLudoComponent data={dataGameLibrary} />
					</div>
				</div>

				<main className='flex w-full grow flex-col items-center py-8 sm:py-16'>
					<div className='flex w-full flex-col items-center gap-40'>
						<div className='flex w-full flex-col'></div>
					</div>
				</main>

				<FooterComponent />
			</div>
		</>
	)
}
