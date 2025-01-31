import { getHotDrinkData } from '@/app/actions/services/DrinksData/getHotDrinkData.service'
import { getSoftDrinkData } from '@/app/actions/services/DrinksData/getSoftDrinkData.service'
// import React, { useEffect, useState } from 'react'

export default async function SoftsAndHotElement() {
	const Softdata = await getSoftDrinkData()
	const Hotdata = await getHotDrinkData()

	return (
		<div className='flex w-full flex-col gap-36 px-4 max-sm:gap-16'>
			<h2 className='w-full font-cardinal text-4xl text-customBrown-100 first-letter:text-customRed-100 sm:text-6xl lg:text-8xl'>
				Soft Drink & Boissons Chaudes
			</h2>
			<div className='flex w-full flex-col items-start justify-center gap-y-16 sm:flex-row sm:gap-36'>
				{/* hot drinks */}
				<div className='flex w-full flex-col gap-4 sm:w-1/2'>
					<h2 className='w-full font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
						Boissons Chaudes
					</h2>
					<div className='flex w-full gap-6 font-cardoRegular text-base text-customBrown-100 sm:text-xl'>
						<p className='flex w-full flex-col gap-2'>
							{Hotdata.map(drink => (
								<span key={drink.id} className='flex w-full'>
									{drink.title} - {drink.price}€
								</span>
							))}
						</p>
					</div>
				</div>

				{/* Soft Drinks */}
				<div className='flex w-full flex-col gap-4 sm:w-1/2'>
					<h2 className='font-cardinal text-3xl text-customBrown-100 first-letter:text-customRed-100 sm:text-4xl'>
						Soft Drinks
					</h2>
					<div className='flex w-full gap-6 font-cardoRegular text-base text-customBrown-100 sm:text-xl'>
						<p className='flex w-full flex-col gap-2'>
							{Softdata.map(drink => (
								<span key={drink.id}>
									{drink.title} {drink.volume ? `(${drink.volume}cl)` : ''} -{' '}
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
