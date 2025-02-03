import { getLandingData } from '@/app/actions/services/getLandingPageData.service'
import LandingWrapper from '@/components/Landing/LandingWrapper'

export default async function Home() {
	const dataLanding = await getLandingData()
	return <LandingWrapper data={dataLanding} />
}
