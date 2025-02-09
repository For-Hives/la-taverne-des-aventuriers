import { getReservationCardData } from '@/app/actions/services/getReservationCardData.service'
import { AnimatedReservationCard } from '@/components/Global/AnimatedComponents/AnimatedReservationCard'

export default async function ReservationCardComponent() {
	const data = await getReservationCardData()

	return <AnimatedReservationCard data={data} />
}
