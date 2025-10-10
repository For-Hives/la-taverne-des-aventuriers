import type { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { HeroTextAnimated } from '@/components/Landing/animatedComponents/heroText'

export default async function HeroTextComponent({
	data,
}: Readonly<{
	data: LandingPageData
}>) {
	return <HeroTextAnimated data={data} />
}
