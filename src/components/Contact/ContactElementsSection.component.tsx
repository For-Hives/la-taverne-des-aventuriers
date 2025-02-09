import { ContactPageData } from '@/app/actions/services/getContactPageData.service'
import { AnimatedContactElementSection } from '@/components/Contact/animatedComponents/animatedContactElementSection'

export default async function ContactElements({
	data,
}: Readonly<{
	data: ContactPageData
}>) {
	return <AnimatedContactElementSection data={data} />
}
