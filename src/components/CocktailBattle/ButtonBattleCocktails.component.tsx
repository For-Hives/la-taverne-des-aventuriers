import Link from 'next/link'

export default async function ButtonBattleCocktailsComponent() {
	return (
		<div className='flex w-full flex-col items-center justify-center pb-16'>
			<Link
				href='/battle'
				aria-label='Battle de cocktails'
				rel='noreferrer noopener'
				className='group flex items-center justify-center rounded-full border-2 border-customBrown-100 px-8 py-3 font-cardoRegular text-xl hover:bg-customBrown-100 hover:text-customWhite-100'
			>
				Battle des Cocktails
			</Link>
		</div>
	)
}
