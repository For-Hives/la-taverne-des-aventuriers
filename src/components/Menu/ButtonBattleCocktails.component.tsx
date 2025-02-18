import Link from 'next/link'

export default async function ButtonBattleCocktailsComponent() {
	return (
		<div className='flex flex-col w-full items-center justify-center py-16'>
			<Link
				href='/battle'
				aria-label='Battle de cocktails'
				rel='noreferrer noopener'
				className='group font-cardoRegular text-xl flex px-8 py-3 items-center justify-center rounded-full border-2 border-customBrown-100 hover:bg-customBrown-100 hover:text-customWhite-100'
			>
				Battle des Cocktails
			</Link>
		</div>
	)
}
