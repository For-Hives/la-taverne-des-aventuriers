import { getNavBarData } from '@/app/actions/services/getNavData.service'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { Metadata } from 'next'

export const revalidate = 10

/**
 * Generates metadata for legal notice page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		alternates: {
			canonical: 'https://latavernedesaventuriers.fr/mentions-legales',
		},
		description:
			"Mentions légales et informations réglementaires de La Taverne des Aventuriers, bar à jeux à Nantes. SIRET, conditions d'utilisation et droits d'auteur.",
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
		title: 'Mentions Légales | La Taverne des Aventuriers',
	}
}

export default async function LegalPage() {
	const navItems = await getNavBarData()

	// Structured data for organization
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'FR',
			addressLocality: 'NANTES',
			postalCode: '44000',
			streetAddress: '13 RUE KERVEGAN',
		},
		foundingDate: '2024',
		legalName: 'LA TAVERNE DES AVENTURIERS',
		name: 'La Taverne des Aventuriers',
		taxID: '93106146900017',
		telephone: '09 79 25 50 73',
		vatID: 'FR64931061469',
	}

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<div className='min-h-screen pt-24'>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />
				<div className='container mx-auto px-4 py-8'>
					<h1 className='mb-8 font-obraletraBold text-4xl text-customBrown-100'>
						Mentions Légales
					</h1>

					<section className='mb-8'>
						<h2 className='mb-4 font-obraletraBold text-2xl text-customBrown-100'>
							Qui sommes-nous ?
						</h2>
						<div className='rounded-lg bg-white p-6 shadow-md'>
							<h3 className='mb-4 font-obraletraBold text-xl text-customBrown-100'>
								Informations légales
							</h3>
							<p className='mb-4'>
								LA TAVERNE DES AVENTURIERS
								<br />
								13 RUE KERVEGAN
								<br />
								44000 NANTES
								<br />
								France
							</p>
							<p className='mb-4'>
								SIRET : 93106146900017
								<br />
								Activité : Débits de boissons (56.30Z)
								<br />
								Numéro de TVA : FR64931061469
							</p>
						</div>
					</section>

					<section className='mb-8'>
						<h2 className='mb-4 font-obraletraBold text-2xl text-customBrown-100'>
							{`Droits d'auteur`}
						</h2>
						<div className='rounded-lg bg-white p-6 shadow-md'>
							<p className='mb-4'>
								{`L'ensemble de ce site est soumis à une protection de droits d'auteur
                            selon les Articles L335-2 et suivants du Code de la propriété intellectuelle.
                            Toute reproduction ou représentation totale ou partielle de son contenu,
                            images, textes, sons, par quelque procédé utilisé, sans l'autorisation
                            préalable de la société 'Cinquin Andy' est strictement interdite.
                            Toute violation constituera une sanction et fera l'objet de poursuite.`}
							</p>
						</div>
					</section>

					<section className='mb-8'>
						<h2 className='mb-4 font-obraletraBold text-2xl text-customBrown-100'>
							Développement du site
						</h2>
						<div className='rounded-lg bg-white p-6 shadow-md'>
							<h3 className='mb-4 font-obraletraBold text-xl text-customBrown-100'>
								Création et Design
							</h3>
							<p className='mb-4'>
								Cinquin Andy
								<br />
								SIRET : 880 505 276 00019
								<br />
								4 Impasse de la Marchaisière
								<br />
								44115 Haute-Goulaine
								<br />
								Téléphone : 06 21 58 26 84
								<br />
								Site web :{' '}
								<a
									href='https://andy-cinquin.fr'
									className='text-customBrown-100 hover:underline'
								>
									https://andy-cinquin.fr
								</a>
							</p>
							<p className='mb-4'>
								{`Services : Création de thème personnalisé, d'image de marque,
								référencement, et hébergement - prestation 'clé en main'.`}
							</p>
						</div>
					</section>

					<section className='mb-8'>
						<h2 className='mb-4 font-obraletraBold text-2xl text-customBrown-100'>
							Hébergement
						</h2>
						<div className='rounded-lg bg-white p-6 shadow-md'>
							<p className='mb-4'>
								netcup GmbH
								<br />
								Daimlerstraße 25
								<br />
								76185 Karlsruhe
								<br />
								Allemagne
							</p>
						</div>
					</section>
				</div>
			</div>
		</>
	)
}
