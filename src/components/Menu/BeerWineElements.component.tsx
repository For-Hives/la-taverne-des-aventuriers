'use client'
import {
	getBeerData,
	BeerData,
} from '@/app/actions/services/DrinksData/getBeerData.service'
import {
	getWineData,
	WineData,
} from '@/app/actions/services/DrinksData/getWineData.service'
import { useEffect, useState } from 'react'

export default function BeerWineElement() {
	// State to hold beer and wine data
	const [beerData, setBeerData] = useState<BeerData[]>([])
	const [wineData, setWineData] = useState<WineData[]>([])

	// useEffect to fetch data when the component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch beer and wine data
				const beers = await getBeerData()
				const wines = await getWineData()
				// Update state with fetched data
				setBeerData(beers)
				setWineData(wines)
			} catch (error) {
				// Handle error during data fetching
				console.error('Error fetching data:', error)
			}
		}

		// Call fetchData function
		fetchData()
	}, []) // Empty dependency array means this runs once on mount

	// Process beer data
	const beers: BeerData[] = beerData.map(beer => ({
		...beer,
		id: beer.id,
		volume: Number(beer.volume), // Ensure volume is a number
	}))

	// Filter beers that are "draft"
	const draftBeers = beers
		.filter(beer => beer.description === 'Pression')
		.reduce(
			(
				acc: Array<{
					id: number
					title: string
					prices: Record<string, number>
				}>,
				beer
			) => {
				// Check if beer with the same title already exists in the array
				const existingBeer = acc.find(b => b.title === beer.title)
				if (existingBeer) {
					// Add price for specific volume
					existingBeer.prices[beer.volume] = beer.price
				} else {
					// Add new beer object to the array
					acc.push({
						id: isNaN(Number(beer.id)) ? 0 : Number(beer.id), // Ensure id is a number
						prices: { [beer.volume]: beer.price }, // Add the price for the given volume
						title: beer.title,
					})
				}
				return acc
			},
			[] // Initialize accumulator as an empty array
		)

	// Filter beers that are "bottle"
	const bottleBeers = beers.filter(beer => beer.description === 'Bouteille')

	// Process wine data and group by title
	const uniqueWines = wineData.reduce((acc: WineData[], wine) => {
		const existingWine = acc.find(w => w.title === wine.title)
		if (existingWine) {
			// Update wine price details
			existingWine.price_glass = wine.price_glass
			existingWine.price_bottle = wine.price_bottle
		} else {
			// Add new wine object to the array
			acc.push(wine)
		}
		return acc
	}, []) // Initialize accumulator as an empty array

	// Separate wines by type
	const redWines = uniqueWines.filter(wine => wine.type === 'Rouge')
	const whiteWines = uniqueWines.filter(wine => wine.type === 'Blanc')
	const roseWines = uniqueWines.filter(wine => wine.type === 'Rosé')

	return (
		<div className='flex w-full flex-col items-center justify-center gap-20 px-4 sm:px-8'>
			<h2 className='w-full text-center font-cardinal text-4xl text-customBrown-100 first-letter:text-customRed-100 sm:text-6xl lg:text-8xl'>
				Bières et Vins
			</h2>

			{/* Beer Section */}
			<div className='mx-md:w-full flex w-3/4 flex-col justify-center gap-6'>
				<h3 className='font-cardinal text-2xl text-customRed-100 sm:text-4xl'>
					Bières:
				</h3>

				{/* Draft Beers */}
				<div className='flex flex-col gap-4'>
					<h4 className='font-cardinal text-xl text-customBrown-100 sm:text-2xl'>
						Pression:
					</h4>
					<div className='w-full text-customBrown-100'>
						<div className='flex'>
							<div className='w-1/2 px-4 py-2 text-left font-cardoRegular'>
								Bière
							</div>
							<div className='w-1/4 px-4 py-2 text-right font-cardoRegular'>
								25cl
							</div>
							<div className='w-1/4 px-4 py-2 text-right font-cardoRegular'>
								50cl
							</div>
						</div>
						{draftBeers.length === 0 ? (
							<div className='px-4 py-2 text-center'>
								Aucune Bière pression disponible
							</div>
						) : (
							draftBeers.map((beer, index) => (
								<div key={`${beer.id}-${index}`} className='flex'>
									<div className='w-1/2 px-4 py-2 text-left'>{beer.title}</div>
									<div className='w-1/4 px-4 py-2 text-right'>
										{beer.prices['25'] || 'N/A'} €
									</div>
									<div className='w-1/4 px-4 py-2 text-right'>
										{beer.prices['50'] || 'N/A'} €
									</div>
								</div>
							))
						)}
					</div>
				</div>

				{/* Bottle Beers */}
				<div className='flex flex-col gap-4'>
					<h4 className='font-cardinal text-xl text-customBrown-100 sm:text-2xl'>
						Bouteilles:
					</h4>
					<div className='flex flex-col gap-2'>
						{bottleBeers.length === 0 ? (
							<p className='text-center'>Pas de Bière bouteille disponible.</p>
						) : (
							bottleBeers.map((beer, index) => (
								<div
									key={`${beer.id}-${index}`}
									className='flex items-center justify-between py-2'
								>
									<h4 className='flex-1 font-cardoRegular text-base text-customBrown-100'>
										{beer.title} ({beer.volume})
									</h4>
									<p className='w-1/4 px-4 text-right font-cardoRegular text-base text-customBrown-100'>
										{beer.price} €
									</p>
								</div>
							))
						)}
					</div>
				</div>
			</div>

			{/* Wine Section */}
			<div className='flex flex-col justify-center gap-6 sm:w-3/4'>
				<h3 className='font-cardinal text-2xl text-customRed-100 sm:text-4xl'>
					Vins:
				</h3>

				{/* Red Wines */}
				<div className='flex flex-col gap-4'>
					<h4 className='font-cardinal text-xl text-customBrown-100 sm:text-2xl'>
						Vins Rouges:
					</h4>
					<table className='w-full table-fixed border-collapse text-left font-cardoRegular text-customBrown-100'>
						<thead>
							<tr>
								<th className='w-4/6 px-4 py-2'>Vin</th>
								<th className='w-1/6 px-4 py-2 text-right'>Verre</th>
								<th className='w-1/6 px-4 py-2 text-right'>Bouteille</th>
							</tr>
						</thead>
						<tbody>
							{redWines.length === 0 ? (
								<tr>
									<td colSpan={3} className='px-4 py-2 text-center'>
										Aucun Vin rouge disponible.
									</td>
								</tr>
							) : (
								redWines.map((wine, index) => (
									<tr key={`${wine.id}-${index}`}>
										<td className='px-4 py-2'>{wine.title}</td>
										<td className='px-4 py-2 text-right'>
											{wine.price_glass} €
										</td>
										<td className='px-4 py-2 text-right'>
											{wine.price_bottle} €
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* White Wines */}
				<div className='flex flex-col gap-4'>
					<h4 className='font-cardinal text-xl text-customBrown-100 sm:text-2xl'>
						Vins Blancs:
					</h4>
					<table className='w-full table-fixed border-collapse text-left font-cardoRegular text-customBrown-100'>
						<thead>
							<tr>
								<th className='w-4/6 px-4 py-2'>Vins</th>
								<th className='w-1/6 px-4 py-2 text-right'>Verre</th>
								<th className='w-1/6 px-4 py-2 text-right'>Bouteille</th>
							</tr>
						</thead>
						<tbody>
							{whiteWines.length === 0 ? (
								<tr>
									<td colSpan={3} className='px-4 py-2 text-right'>
										Aucun Vin blanc disponible.
									</td>
								</tr>
							) : (
								whiteWines.map((wine, index) => (
									<tr key={`${wine.id}-${index}`}>
										<td className='px-4 py-2'>{wine.title}</td>
										<td className='px-4 py-2 text-right'>
											{wine.price_glass} €
										</td>
										<td className='px-4 py-2 text-right'>
											{wine.price_bottle} €
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Rose Wines */}
				<div className='flex flex-col gap-4'>
					<h4 className='font-cardinal text-xl text-customBrown-100 sm:text-2xl'>
						Vins Rosés:
					</h4>
					<table className='w-full table-fixed border-collapse text-left font-cardoRegular text-customBrown-100'>
						<thead>
							<tr>
								<th className='w-4/6 px-4 py-2'>Vin</th>
								<th className='w-1/6 px-4 py-2 text-right'>Verre</th>
								<th className='w-1/6 px-4 py-2 text-right'>Bouteille</th>
							</tr>
						</thead>
						<tbody>
							{roseWines.length === 0 ? (
								<tr>
									<td colSpan={3} className='px-4 py-2 text-center'>
										Pas de Vin Rosé disponible.
									</td>
								</tr>
							) : (
								roseWines.map((wine, index) => (
									<tr key={`${wine.id}-${index}`}>
										<td className='px-4 py-2'>{wine.title}</td>
										<td className='px-4 py-2 text-right'>
											{wine.price_glass} €
										</td>
										<td className='px-4 py-2 text-right'>
											{wine.price_bottle} €
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
