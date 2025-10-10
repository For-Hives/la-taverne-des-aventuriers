import type { EventData } from '@/app/actions/services/getEventData'
import type { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import BentoEventsGrid from '@/components/Landing/animatedComponents/AnimatedEvents'

export default async function EventsComponent({
	data,
	dataEvents,
}: Readonly<{
	data: LandingPageData
	dataEvents: EventData[]
}>) {
	return <BentoEventsGrid data={data} dataEvents={dataEvents} />
}
