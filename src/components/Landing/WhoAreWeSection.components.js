import Image from 'next/image'
import Link from 'next/link'

const WhoAreWeSection = () => {
	return (
		<div className='flex w-3/4 items-center gap-16 rounded-lg bg-gray-400'>
			{/*Image*/}
			<Image
				src='/assets/images/vinbiere.png'
				alt='Vinbieres'
				width={300}
				height={300}
			/>
			{/*Text*/}
			<div className='w-1/2'>
				{/*title*/}
				<h2>{`D'où vient notre renom ?`}</h2>
				{/*Description*/}
				<p>Lorem ipsum</p>
				{/*Link*/}
				<Link href='/'>Read More</Link>
			</div>
		</div>
	)
}

export default WhoAreWeSection
