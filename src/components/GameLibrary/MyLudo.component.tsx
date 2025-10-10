import type { GamesPageData } from '@/app/actions/services/getGamePageData.service'
import { AnimatedMyLudoComponent } from '@/components/GameLibrary/animatedComponents/animatedMyLudoComponent'

export default async function MyLudoComponent({
	data,
}: Readonly<{
	data: GamesPageData
}>) {
	return <AnimatedMyLudoComponent data={data} />
}
