import { getReservationData } from '@/app/actions/services/getReservationPageData.service'
import { AnimatedReservationComponent } from '@/components/Contact/animatedComponents/animatedReservationComponent'

export default async function ReservationComponent() {
	// Fetch reservation data
	const data = await getReservationData()

	return <AnimatedReservationComponent data={data} />
}
