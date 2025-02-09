import { getEventListData } from '@/app/actions/services/getEventListData'
import { getLandingData } from '@/app/actions/services/getLandingPageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import LandingWrapper from '@/components/Landing/LandingWrapper'

export default async function Home() {
	const dataLanding = await getLandingData()
	const dataEvents = await getEventListData()
	const navItems = await getNavBarData()
	return (
		<LandingWrapper
			data={dataLanding}
			dataEvents={dataEvents}
			navItems={navItems}
		/>
	)
}
