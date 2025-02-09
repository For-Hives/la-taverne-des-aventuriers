import { getEventListData } from '@/app/actions/services/getEventListData'
import { getLandingData } from '@/app/actions/services/getLandingPageData.service'
import LandingWrapper from '@/components/Landing/LandingWrapper'

export default async function Home() {
	const dataLanding = await getLandingData()
	const dataEvents = await getEventListData()
	return <LandingWrapper data={dataLanding} dataEvents={dataEvents} />
}
