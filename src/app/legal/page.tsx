// legal/page.tsx
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { motion } from 'framer-motion'

export default async function LegalPage() {
	const navItems = await getNavBarData()

	return (
		<div className='min-h-screen pt-24'>
			<Navbar navItems={navItems} />
			<MobileNavbar navItems={navItems} />
			<div className='container mx-auto px-4 py-8'>
				<h1 className='mb-8 font-obraletraBold text-4xl text-customBrown-100'>
					Legal Notice
				</h1>

				<section className='mb-8'>
					<h2 className='mb-4 font-obraletraBold text-2xl text-customBrown-100'>
						About Us
					</h2>
					<div className='rounded-lg bg-white p-6 shadow-md'>
						<h3 className='mb-4 font-obraletraBold text-xl text-customBrown-100'>
							Business Details
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
							SIRET: 93106146900017
							<br />
							Activity: Débits de boissons (56.30Z)
							<br />
							VAT Number: FR64931061469
						</p>
					</div>
				</section>

				<section className='mb-8'>
					<h2 className='mb-4 font-obraletraBold text-2xl text-customBrown-100'>
						Copyright
					</h2>
					<div className='rounded-lg bg-white p-6 shadow-md'>
						<p className='mb-4'>
							This entire website is protected by copyright according to
							Articles L335-2 and following of the Intellectual Property Code.
							Any reproduction or representation of its content, images, texts,
							sounds, by any process used, without prior authorization from the
							company 'Cinquin Andy' is strictly prohibited. Any violation will
							constitute a sanction and will be prosecuted.
						</p>
					</div>
				</section>

				<section className='mb-8'>
					<h2 className='mb-4 font-obraletraBold text-2xl text-customBrown-100'>
						Website Development
					</h2>
					<div className='rounded-lg bg-white p-6 shadow-md'>
						<h3 className='mb-4 font-obraletraBold text-xl text-customBrown-100'>
							Development & Design
						</h3>
						<p className='mb-4'>
							Cinquin Andy
							<br />
							SIRET: 880 505 276 00019
							<br />
							4 Impasse de la Marchaisière
							<br />
							44115 Haute-Goulaine
							<br />
							Phone: 06 21 58 26 84
							<br />
							Website:{' '}
							<a
								href='https://andy-cinquin.fr'
								className='text-customBrown-100 hover:underline'
							>
								https://andy-cinquin.fr
							</a>
						</p>
						<p className='mb-4'>
							Services: Custom theme creation, branding, SEO, and hosting - Full
							turnkey service.
						</p>
					</div>
				</section>

				<section className='mb-8'>
					<h2 className='mb-4 font-obraletraBold text-2xl text-customBrown-100'>
						Hosting
					</h2>
					<div className='rounded-lg bg-white p-6 shadow-md'>
						<p className='mb-4'>
							netcup GmbH
							<br />
							Daimlerstraße 25
							<br />
							76185 Karlsruhe
							<br />
							Germany
						</p>
					</div>
				</section>
			</div>
		</div>
	)
}
