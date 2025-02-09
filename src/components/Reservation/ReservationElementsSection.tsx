import { getWhoAreWePageData } from '@/app/actions/services/getWhoAreWePageData.service'
import { AnimatedReservationElement } from '@/components/Reservation/animatedComponents/AnimatedReservationElement'

export default async function ReservationElementComponent() {
	const data = await getWhoAreWePageData()

	return <AnimatedReservationElement data={data} />
}
