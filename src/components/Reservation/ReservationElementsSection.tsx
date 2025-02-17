import { getWhoAreWePageData } from '@/app/actions/services/getWhoAreWePageData.service'
import { AnimatedReservationElement as AnimatedWhoAreWeElement } from '@/components/Reservation/animatedComponents/AnimatedReservationElement'

export async function ReservationElementComponent() {
	const data = await getWhoAreWePageData()

	return <AnimatedWhoAreWeElement data={data} />
}
