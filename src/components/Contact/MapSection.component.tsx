import type { ContactPageData } from '@/app/actions/services/getContactPageData.service'
import { AnimatedMapSectionComponent } from '@/components/Contact/animatedComponents/animatedMapSectionComponent'

export default async function MapSection({ data }: Readonly<{ data: ContactPageData }>) {
	return <AnimatedMapSectionComponent data={data} />
}
