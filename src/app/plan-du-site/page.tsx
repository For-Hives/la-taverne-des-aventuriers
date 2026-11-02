import type { Metadata } from 'next'
import Link from 'next/link'

import { authWithPocketBase } from '@/app/actions/AuthService'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { absoluteUrl, fetchEventEntries, PUBLIC_PAGES } from '@/lib/sitemap-pages'

export const revalidate = 10

/**
 * Generates metadata for the sitemap page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: absoluteUrl('/plan-du-site'),
		},
		description:
			'Plan du site de La Taverne des Aventuriers, bar à jeux à Nantes : toutes les pages, la carte, les événements, la bibliothèque de jeux et la réservation.',
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
		},
		title: 'Plan du site | La Taverne des Aventuriers',
	}
}

const linkClassName = 'hover:text-custom-red-100 transition-all duration-300 ease-in-out hover:underline'

export default async function SitemapPage() {
	const navItems = await getNavBarData()
	const pb = await authWithPocketBase().catch(() => null)
	const events = await fetchEventEntries(pb)

	return (
		<div className="min-h-screen pt-24">
			<Navbar navItems={navItems} />
			<MobileNavbar navItems={navItems} />
			<div className="container mx-auto px-4 py-8">
				<h1 className="font-obraletra-bold text-custom-brown-100 mb-8 text-4xl">Plan du site</h1>

				<section className="mb-8">
					<h2 className="font-obraletra-bold text-custom-brown-100 mb-4 text-2xl">Pages</h2>
					<div className="rounded-lg bg-white p-6 shadow-md">
						<ul className="flex flex-col gap-2">
							{PUBLIC_PAGES.map(page => (
								<li key={page.path}>
									<Link className={linkClassName} href={page.path}>
										{page.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</section>

				{events.length > 0 && (
					<section className="mb-8">
						<h2 className="font-obraletra-bold text-custom-brown-100 mb-4 text-2xl">Événements</h2>
						<div className="rounded-lg bg-white p-6 shadow-md">
							<ul className="flex flex-col gap-2">
								{events.map(event => (
									<li key={event.slug}>
										<Link className={linkClassName} href={`/evenements/${event.slug}`}>
											{event.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>
				)}
			</div>
		</div>
	)
}
