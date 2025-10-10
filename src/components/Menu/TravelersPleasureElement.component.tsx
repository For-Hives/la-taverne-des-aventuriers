import Image from 'next/image'

import { getTravelersPleasureData } from '@/app/actions/services/DrinksData/getTravelersPleasureData.service'

interface TravelersPleasureElementProps {
	readonly priceDisplay?: 'global' | 'individual'
}

export default async function TravelersPleasureElement({ priceDisplay = 'individual' }: TravelersPleasureElementProps) {
	const data = await getTravelersPleasureData()
	// Assume there are two objects in travelersPleasureData, one for each side
	const leftText = data[0]
	const rightText = data[1]
	const imageSrc = '/assets/images/tartines.webp'

	// Use first item's price for global display
	const globalPrice = data[0]?.price || 0

	return (
		<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="mb-16 flex flex-col items-center justify-center">
				<h2 className="font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 text-center text-8xl max-sm:text-6xl">
					Les Plaisirs Du Voyageur
				</h2>

				{priceDisplay === 'global' && globalPrice > 0 && (
					<div className="border-custom-brown-100 mt-4 flex items-center justify-center gap-2 rounded-full border-2 bg-yellow-100/20 px-6 py-3 shadow-lg">
						<span className="font-cardo-regular text-custom-brown-100 text-xl font-semibold">{globalPrice}€</span>
						<Image
							src="/assets/images/elements/piece.webp"
							alt="Pièce d'or"
							width={24}
							height={24}
							className="h-6 w-6"
						/>
					</div>
				)}
			</div>

			<div className="space-y-24">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
					{/* Left Side Content */}
					<div className="flex flex-col items-start justify-center gap-6">
						<div className="flex w-full flex-wrap items-start justify-between gap-4">
							<h3 className="font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 text-4xl">
								{leftText.title}
							</h3>

							{priceDisplay === 'individual' && leftText.price > 0 && (
								<div className="border-custom-brown-100 flex items-center justify-center gap-1 rounded-full border-2 bg-yellow-100/20 px-4 py-1.5 shadow-md">
									<span className="font-cardo-regular text-custom-brown-100 text-lg font-medium">
										{leftText.price}€
									</span>
									<Image
										src="/assets/images/elements/piece.webp"
										alt="Pièce d'or"
										width={20}
										height={20}
										className="h-5 w-5"
									/>
								</div>
							)}
						</div>

						<p className="font-cardo-regular text-custom-brown-100 text-base lg:text-lg">{leftText.description}</p>
					</div>

					{/* Center Image */}
					<div className="flex justify-center">
						<Image
							src={imageSrc}
							alt="Tartines Image"
							width={300}
							height={300}
							className="max-w-[300px] rounded-lg object-cover"
						/>
					</div>

					{/* Right Side Content */}
					<div className="flex flex-col items-start justify-center gap-6">
						<div className="flex w-full flex-wrap items-start justify-between gap-4">
							<h3 className="font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 text-4xl">
								{rightText.title}
							</h3>

							{priceDisplay === 'individual' && rightText.price > 0 && (
								<div className="border-custom-brown-100 flex items-center justify-center gap-1 rounded-full border-2 bg-yellow-100/20 px-4 py-1.5 shadow-md">
									<span className="font-cardo-regular text-custom-brown-100 text-lg font-medium">
										{rightText.price}€
									</span>
									<Image
										src="/assets/images/elements/piece.webp"
										alt="Pièce d'or"
										width={20}
										height={20}
										className="h-5 w-5"
									/>
								</div>
							)}
						</div>

						<p className="font-cardo-regular text-custom-brown-100 text-base lg:text-lg">{rightText.description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
