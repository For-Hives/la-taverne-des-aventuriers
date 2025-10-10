import CountUp from './CountUp'

interface ChainWinCounterProps {
	label: string
	score: number
	color: string
}

export default function ChainWinCounter({ color, label, score }: Readonly<ChainWinCounterProps>) {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className={`text-${color} mb-1 text-sm font-medium tracking-wider uppercase`}>{label}</div>
			<div className="flex items-center">
				<CountUp from={0} to={score} duration={0.4} className={`text-2xl font-bold text-${color} mr-2`} />
				<span className={`font-cardinal ml-1 text-3xl text-${color}`}>
					{score === 1 ? 'victoire' : 'victoires'} consécutive
					{score > 1 ? 's' : ''}
				</span>
			</div>
		</div>
	)
}
