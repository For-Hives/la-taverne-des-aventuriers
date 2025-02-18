// VS Badge component
export function VsBadge() {
	return (
		<div className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 max-lg:static max-lg:translate-x-0 max-lg:translate-y-0'>
			<div className='relative'>
				<div className='absolute -inset-8 rounded-full bg-gradient-to-r from-customBrown-100/30 to-customRed-100/30 blur-xl' />
				<span className='relative text-center font-cardinal text-7xl font-bold text-customBrown-100 drop-shadow-lg'>
					VS
				</span>
			</div>
		</div>
	)
}
