import { GamesPageData } from '@/app/actions/services/getGamePageData.service'
import {AnimatedGLHeroComponent} from "@/components/GameLibrary/animatedComponents/animatedGLHeroComponent";

export default function GLHeroComponent({
	data,
}: Readonly<{
	data: GamesPageData
}>) {
	return < AnimatedGLHeroComponent data={data} />;
}
