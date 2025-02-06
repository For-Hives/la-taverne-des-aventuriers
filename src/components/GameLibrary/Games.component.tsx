import { GamesPageData } from '@/app/actions/services/getGamePageData.service'
import {AnimatedGameComponent} from "@/components/GameLibrary/animatedComponents/animatedGamesComponents";


export default async function GameComponent({
	data,
}: Readonly<{ data: GamesPageData }>) {
	return < AnimatedGameComponent data={data} />;
}
