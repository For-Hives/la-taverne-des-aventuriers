import { EventListData } from '@/app/actions/services/getEventListData'
import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { AnimatedEvents } from '@/components/Landing/animatedComponents/AnimatedEvents'

export default async function EventsComponent({
	data,
	dataEvents,
}: Readonly<{
	data: LandingPageData
	dataEvents: EventListData[]
}>) {
	return <AnimatedEvents data={data} dataEvents={dataEvents} />
}
