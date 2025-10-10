import type { ContactPageData } from '@/app/actions/services/getContactPageData.service'
import { AnimatedHowToContactComponent } from '@/components/Contact/animatedComponents/animatedHowToContactComponent'

export default async function HowToContact({
	data,
}: Readonly<{
	data: ContactPageData
}>) {
	return <AnimatedHowToContactComponent data={data} />
}
