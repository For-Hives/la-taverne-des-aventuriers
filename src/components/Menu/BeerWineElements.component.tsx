'use client'
import {
	getBeerData,
	getWineData,
	BeerData,
	WineData,
} from '@/app/actions/services/getDrinkData.service' // Import services to fetch data
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
			{/* Beer Section */}
			<div className='flex flex-col justify-center gap-6 sm:w-3/4'>
				<h3 className='font-cardinal text-2xl text-title-100 sm:text-4xl'>
					Beers:
				</h3>

				<div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
					{/* Draft Beers */}
					<div className='flex flex-col gap-4'>
						<h4 className='font-cardinal text-xl text-title-200 sm:text-2xl'>
							Draft Beers:
						</h4>
						<table className='w-full border-collapse text-left font-obraletra text-title-200'>
							<thead>
								<tr>
									<th className='px-4 py-2'>Beer</th>
									<th className='px-4 py-2'>25cl</th>
									<th className='px-4 py-2'>50cl</th>
								</tr>
							</thead>
							<tbody>
								{draftBeers.length === 0 ? (
									<tr>
										<td colSpan={3} className='px-4 py-2 text-center'>
											No draft beer available.
										</td>
									</tr>
								) : (
									// Display draft beers
									draftBeers.map((beer, index) => (
										<tr key={`${beer.id}-${index}`}>
											<td className='px-4 py-2'>{beer.title}</td>
											<td className='px-4 py-2'>
												{beer.prices['25'] || 'N/A'} €
											</td>
											<td className='px-4 py-2'>
												{beer.prices['50'] || 'N/A'} €
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{/* Bottle Beers */}
					<div className='flex flex-col gap-4'>
						<h4 className='font-cardinal text-xl text-title-200 sm:text-2xl'>
							Bottle Beers:
						</h4>
						<div className='flex flex-col gap-2'>
							{bottleBeers.length === 0 ? (
								<p className='text-center'>No bottle beer available.</p>
							) : (
								// Display bottle beers
								bottleBeers.map((beer, index) => (
									<div
										key={`${beer.id}-${index}`}
										className='flex items-center justify-between'
									>
										<h4 className='font-cardinal text-lg text-title-200'>
											{beer.title} ({beer.volume})
										</h4>
										<p className='text-right font-obraletra text-lg text-title-200'>
											{beer.price} €
										</p>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Wine Section */}
			<div className='flex flex-col justify-center gap-6 sm:w-3/4'>
				<h3 className='font-cardinal text-2xl text-title-100 sm:text-4xl'>
					Wines:
				</h3>

				{/* Red Wines */}
				<div className='flex flex-col gap-4'>
					<h4 className='font-cardinal text-xl text-title-200 sm:text-2xl'>
						Red Wines:
					</h4>
					<table className='w-full border-collapse text-left font-obraletra text-title-200'>
						<thead>
							<tr>
								<th className='px-4 py-2'>Wine</th>
								<th className='px-4 py-2'>Glass</th>
								<th className='px-4 py-2'>Bottle</th>
							</tr>
						</thead>
						<tbody>
							{redWines.length === 0 ? (
								<tr>
									<td colSpan={3} className='px-4 py-2 text-center'>
										No red wine available.
									</td>
								</tr>
							) : (
								// Display red wines
								redWines.map((wine, index) => (
									<tr key={`${wine.id}-${index}`}>
										<td className='px-4 py-2'>{wine.title}</td>
										<td className='px-4 py-2'>{wine.price_glass} €</td>
										<td className='px-4 py-2'>{wine.price_bottle} €</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* White Wines */}
				<div className='flex flex-col gap-4'>
					<h4 className='font-cardinal text-xl text-title-200 sm:text-2xl'>
						White Wines:
					</h4>
					<table className='w-full border-collapse text-left font-obraletra text-title-200'>
						<thead>
							<tr>
								<th className='px-4 py-2'>Wine</th>
								<th className='px-4 py-2'>Glass</th>
								<th className='px-4 py-2'>Bottle</th>
							</tr>
						</thead>
						<tbody>
							{whiteWines.length === 0 ? (
								<tr>
									<td colSpan={3} className='px-4 py-2 text-center'>
										No white wine available.
									</td>
								</tr>
							) : (
								// Display white wines
								whiteWines.map((wine, index) => (
									<tr key={`${wine.id}-${index}`}>
										<td className='px-4 py-2'>{wine.title}</td>
										<td className='px-4 py-2'>{wine.price_glass} €</td>
										<td className='px-4 py-2'>{wine.price_bottle} €</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Rose Wines */}
				<div className='flex flex-col gap-4'>
					<h4 className='font-cardinal text-xl text-title-200 sm:text-2xl'>
						Rose Wines:
					</h4>
					<table className='w-full border-collapse text-left font-obraletra text-title-200'>
						<thead>
							<tr>
								<th className='px-4 py-2'>Wine</th>
								<th className='px-4 py-2'>Glass</th>
								<th className='px-4 py-2'>Bottle</th>
							</tr>
						</thead>
						<tbody>
							{roseWines.length === 0 ? (
								<tr>
									<td colSpan={3} className='px-4 py-2 text-center'>
										No rose wine available.
									</td>
								</tr>
							) : (
								// Display rose wines
								roseWines.map((wine, index) => (
									<tr key={`${wine.id}-${index}`}>
										<td className='px-4 py-2'>{wine.title}</td>
										<td className='px-4 py-2'>{wine.price_glass} €</td>
										<td className='px-4 py-2'>{wine.price_bottle} €</td>
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
