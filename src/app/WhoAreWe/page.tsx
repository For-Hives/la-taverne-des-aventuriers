import Navbar from '@/components/Global/Navbar.component'
import ReservationElementComponent from '@/components/Reservation/ReservationElementsSection'

export default function Page() {
	return (
		<div>
			<Navbar />

			<div className='mask-custom absolute bottom-0 left-0 h-[125%] w-full -translate-y-[55%] transform bg-whoareweimage opacity-75'></div>

			<div className='relative mt-[256px] flex flex-col items-center gap-[256px]'>
				<ReservationElementComponent />
			</div>
		</div>
	)
}
