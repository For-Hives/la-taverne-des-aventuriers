import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { AnimatedEvents } from '@/components/Landing/animatedComponents/AnimatedEvents'

export default async function EventsComponent({
	data,
}: Readonly<{
	data: LandingPageData
}>) {
	return < AnimatedEvents data={data} />;

}
