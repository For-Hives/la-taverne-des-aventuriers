'use client'
import {
	getSoftDrinkData,
	getHotDrinkData,
	HotDrinkData,
	SoftDrinkData,
} from '@/app/actions/services/getDrinkData.service'
import React, { useEffect, useState } from 'react'

export default function SoftsAndHotElement() {
	const [softDrinks, setSoftDrinks] = useState<SoftDrinkData[]>([])
	const [hotDrinks, setHotDrinks] = useState<HotDrinkData[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const softData = await getSoftDrinkData()
				const hotData = await getHotDrinkData()

				setSoftDrinks(softData)
				setHotDrinks(hotData)
			} catch (error) {
				console.error('Error fetching drink data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData().catch(error => {
			console.error('Error in fetching drinks:', error)
		})
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className='flex w-3/4 flex-col gap-36 px-4'>
			<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100 sm:text-6xl lg:text-8xl'>
				Soft Drink & Boissons Chaudes
			</h2>
			<div className='flex w-full flex-col items-center justify-center gap-16 sm:flex-row sm:gap-36'>
				{/* hot drinks */}
				<div className='flex w-1/2 flex-col gap-4 sm:w-1/2'>
					<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
						Boissons Chaudes
					</h2>
					<div className='flex gap-6 font-cardinal text-base text-title-200 sm:text-xl'>
						<p className='flex w-1/2 flex-col gap-2 sm:w-1/2'>
							{hotDrinks.map(drink => (
								<span key={drink.id}>
									{drink.title} - {drink.price}€
								</span>
							))}
						</p>
					</div>
				</div>

				{/* Soft Drinks */}
				<div className='flex w-1/2 flex-col gap-4 sm:w-1/2'>
					<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
						Soft Drinks
					</h2>
					<div className='flex gap-6 font-cardinal text-base text-title-200 sm:text-xl'>
						<p className='flex w-1/2 flex-col gap-2 sm:w-1/2'>
							{softDrinks.map(drink => (
								<span key={drink.id}>
									{drink.title} {drink.volume ? `(${drink.volume}cl)` : ''}
									{drink.price}€
								</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
