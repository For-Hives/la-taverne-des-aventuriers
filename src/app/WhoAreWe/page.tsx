import FooterComponent from '@/components/Global/Footer.component'
import ContactElements from '@/components/WhoAreWe/ContactElementsSection.component'
import HowToContact from '@/components/WhoAreWe/HowToContact.component'
import MapSection from '@/components/WhoAreWe/MapSection.component'

import Navbar from '../../components/Global/Navbar.component.js'

export default function WhoAreWe() {
	return (
		<div className='relative flex h-screen w-screen flex-col items-center gap-96'>
			{/* Navbar */}
			<Navbar />

			{/* Image de fond */}
			<div className='bg-whoareweimage mask-custom absolute bottom-0 left-0 h-[125%] w-full -translate-y-[55%] transform opacity-75'></div>

			{/* Contenu principal avec espacement */}
			<div className='relative mt-[256px] flex flex-col items-center gap-[256px]'>
				<HowToContact />
				<ContactElements />
				<MapSection />
			</div>

			<FooterComponent />
		</div>
	)
}
