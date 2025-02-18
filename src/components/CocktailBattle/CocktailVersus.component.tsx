import { CocktailBattleData } from "@/app/actions/services/getCocktailBattlePageData.service";
import Image from "next/image";

export default function CocktailVersusComponent({
													data,
												}: Readonly<{
	data: CocktailBattleData;
}>) {
	return (
		<div className="flex w-full h-[80vh] items-stretch justify-center px-20 font-cardoRegular text-lg gap-4 text-customBrown-100">
			{/* Colonne 1 */}
			<div className="relative flex w-1/2 h-full items-end justify-center">
				{/* Image en fond */}
				<div className="absolute inset-0 z-0">
					<Image
						src={data.cocktail_1_image}
						alt={data.cocktail1_title}
						fill
						className="object-cover"
					/>
				</div>

				{/* Conteneur de texte */}
				<div className="relative z-10 flex flex-col w-full justify-center gap-9 bg-black/20 px-4 min-h-[25vh]">
					<h2 className="font-cardinal text-3xl first-letter:text-customRed-100">
						{data.cocktail1_title}
					</h2>
					<p>
            <span
				dangerouslySetInnerHTML={{
					__html: data.cocktail1_description,
				}}
			/>
					</p>
				</div>
			</div>

			{/* Colonne 2 */}
			<div className="relative flex w-1/2 h-full items-end justify-center">
				{/* Image en fond */}
				<div className="absolute inset-0 z-0">
					<Image
						src={data.cocktail_2_image}
						alt={data.cocktail2_title}
						fill
						className="object-cover"
					/>
				</div>

				{/* Conteneur de texte */}
				<div className="relative z-10 flex flex-col w-full justify-center gap-9 bg-black/20 px-4 min-h-[25vh]">
					<h2 className="font-cardinal text-3xl first-letter:text-customRed-100">
						{data.cocktail2_title}
					</h2>
					<p>
            <span
				dangerouslySetInnerHTML={{
					__html: data.cocktail2_description,
				}}
			/>
					</p>
				</div>
			</div>
		</div>
	);
}
