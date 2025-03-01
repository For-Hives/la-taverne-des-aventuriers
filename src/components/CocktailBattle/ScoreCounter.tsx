'use client'

import { CountGroup } from '@/components/CocktailBattle/CountGroup'
import { useState, useEffect, useCallback } from 'react'

export function ScoreCounter({
	color = 'customBrown-100',
	data,
	title,
}: Readonly<{
	data: number
	title: string
	color?: string
}>) {
	const initialScore = data || 0
	const [count] = useState(initialScore)
	const [showCount, setShowCount] = useState(0)
	const [groupSize, setGroupSize] = useState(15)

	// Determine group size based on screen width
	useEffect(() => {
		const updateGroupSize = () => {
			setGroupSize(window.innerWidth >= 600 ? 25 : 15)
		}

		// Set initial size
		if (typeof window !== 'undefined') {
			updateGroupSize()

			// Update on resize
			window.addEventListener('resize', updateGroupSize)
			return () => window.removeEventListener('resize', updateGroupSize)
		}
	}, [])

	// Animate count
	useEffect(() => {
		if (showCount < count) {
			const timer = setTimeout(() => {
				setShowCount(prev => Math.min(prev + 1, count))
			}, 50)
			return () => clearTimeout(timer)
		}
	}, [showCount, count])

	// Create properly organized rows and groups
	const createRows = useCallback(() => {
		const rows = []
		let remainingCount = count

		while (remainingCount > 0) {
			// Count for current row (max groupSize)
			const rowCount = Math.min(remainingCount, groupSize)
			remainingCount -= rowCount

			// Create groups of 5 for this row
			const rowGroups = []
			let rowRemaining = rowCount

			while (rowRemaining > 0) {
				const groupCount = Math.min(rowRemaining, 5)
				rowGroups.push(groupCount)
				rowRemaining -= groupCount
			}

			rows.push({
				rowCount,
				rowEnd: count - remainingCount,
				rowGroups,
				rowStart: count - remainingCount - rowCount + 1,
			})
		}

		return rows
	}, [count, groupSize])

	const rows = createRows()

	return (
		<div className='relative flex h-fit w-full flex-col items-start justify-center gap-2 rounded-lg p-0 sm:items-center'>
			<h2 className={`w-full font-cardinal text-5xl text-${color}`}>
				<span className='mb-2 block text-center'>{title}</span>
				<span
					className={'block text-center font-cardoRegular text-6xl font-bold'}
				>
					{count}
				</span>
			</h2>

			{/* Main score counter display */}
			<div className='relative mt-4 w-full md:mx-auto md:max-w-[600px] lg:max-w-[1200px]'>
				{rows.map((row, rowIndex) => (
					<div
						key={`row-${rowIndex}`}
						className='mb-4 flex items-center justify-between'
					>
						{/* Left side: count groups */}
						<div className='flex gap-0'>
							{row.rowGroups.map((groupCount, groupIndex) => (
								<CountGroup
									key={`group-${rowIndex}-${groupIndex}`}
									groupCount={groupCount}
								/>
							))}
						</div>

						{/* Right side: numerical counters */}
						<div className='absolute right-0 pr-2 text-right italic opacity-50 lg:-right-8'>
							({row.rowEnd})
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
