import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function ButtonBattleMocktailsComponent() {
	return (
		<div className="flex w-full flex-col items-center justify-center pb-16">
			<Link
				href="/battle/mocktails"
				aria-label="Battle de mocktails"
				rel="noreferrer noopener"
				className="group border-custom-brown-100 font-cardo-regular hover:bg-custom-brown-100 hover:text-custom-white-100 flex items-center justify-center rounded-full border-2 px-8 py-3 text-xl"
			>
				<ArrowRight className="mr-2" /> Découvrir la bataille des Mocktails
			</Link>
		</div>
	)
}
