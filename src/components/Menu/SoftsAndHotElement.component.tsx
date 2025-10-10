import { getHotDrinkData } from '@/app/actions/services/DrinksData/getHotDrinkData.service'
import { getSoftDrinkData } from '@/app/actions/services/DrinksData/getSoftDrinkData.service'
// import React, { useEffect, useState } from 'react'

export default async function SoftsAndHotElement() {
	const Softdata = await getSoftDrinkData()
	const Hotdata = await getHotDrinkData()

	return (
		<div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
			<div className='mb-16 flex flex-col items-center justify-center'>
				<h2 className='font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 text-center text-8xl max-sm:text-5xl'>
					Soft Drinks & Boissons Chaudes
				</h2>
			</div>

			<div className='space-y-24'>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
					{/* Hot drinks */}
					<div className='flex flex-col gap-6'>
						<h3 className='font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 text-4xl'>
							Boissons Chaudes
						</h3>
						<div className='flex flex-col gap-4'>
							{Hotdata.length === 0 ? (
								<p className='font-cardo-regular text-custom-brown-100 text-base lg:text-lg'>
									Aucune boisson chaude disponible.
								</p>
							) : (
								Hotdata.map(drink => (
									<div
										key={drink.id}
										className='border-custom-brown-100/10 flex justify-between border-b py-3 last:border-0'
									>
										<span className='font-cardo-regular text-custom-brown-100 text-base lg:text-lg'>
											{drink.title}
										</span>
										<span className='font-cardo-regular text-custom-brown-100 text-base lg:text-lg'>
											{drink.price}€
										</span>
									</div>
								))
							)}
						</div>
					</div>

					{/* Soft Drinks */}
					<div className='flex flex-col gap-6'>
						<h3 className='font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 text-4xl'>
							Soft Drinks
						</h3>
						<div className='flex flex-col gap-4'>
							{Softdata.length === 0 ? (
								<p className='font-cardo-regular text-custom-brown-100 text-base lg:text-lg'>
									Aucun soft drink disponible.
								</p>
							) : (
								Softdata.map(drink => (
									<div
										key={drink.id}
										className='border-custom-brown-100/10 flex justify-between border-b py-3 last:border-0'
									>
										<span className='font-cardo-regular text-custom-brown-100 text-base lg:text-lg'>
											{drink.title} {drink.volume ? `(${drink.volume}cl)` : ''}
										</span>
										<span className='font-cardo-regular text-custom-brown-100 text-base lg:text-lg'>
											{drink.price}€
										</span>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
