import type { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { AnimatedWAWSection } from '@/components/Landing/animatedComponents/AnimatedWhoAreWeSection'

export default async function WhoAreWeSection({
	data,
}: Readonly<{
	data: LandingPageData
}>) {
	return <AnimatedWAWSection data={data} />
}
