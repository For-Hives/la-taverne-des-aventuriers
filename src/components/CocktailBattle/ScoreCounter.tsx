import { ScoreCounterProps } from '@/components/CocktailBattle/CocktailBattle.component'
import { CountGroup } from '@/components/CocktailBattle/CountGroup'
// Score counter component
import { useState } from 'react'

export function ScoreCounter({ data }: Readonly<ScoreCounterProps>) {
	const initialScore = data || 0
	const [count] = useState(initialScore)

	// Calculate groups of 5
	const fullGroups = Math.floor(count / 5)
	const remainder = count % 5

	// Create array of groups
	const groups = Array.from({ length: fullGroups }, () => 5)
	if (remainder > 0) {
		groups.push(remainder)
	}

	return (
		<div className='flex h-fit w-full flex-col items-center justify-center gap-8'>
			<div className='flex flex-wrap items-center justify-center gap-1'>
				{groups.map((groupCount, index) => (
					<CountGroup key={`group-${index}`} groupCount={groupCount} />
				))}
			</div>
		</div>
	)
}
