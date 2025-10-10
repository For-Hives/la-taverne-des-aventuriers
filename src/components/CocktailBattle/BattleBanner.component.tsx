'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BattleBanner() {
	const router = useRouter()

	const handleImageClick = () => {
		router.push('/battle')
	}

	return (
		<div className="mb-36 flex flex-col items-center gap-8">
			<button
				className="relative flex h-[90vw] max-h-96 w-[90vw] max-w-96 cursor-pointer items-center justify-center xl:h-auto xl:max-h-max xl:w-auto xl:max-w-max"
				onClick={handleImageClick}
				aria-label="Accéder à la battle des cocktails"
			>
				<div className="absolute -inset-4 rounded-full" />
				<Image
					src="/assets/images/vs.webp"
					alt="Battle des cocktails"
					width={520}
					height={520}
					className="relative mb-2 opacity-75 drop-shadow-lg transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div className="flex w-full -translate-y-12 flex-col items-center justify-center md:-translate-y-24">
				<Link
					href="/battle"
					aria-label="Battle de cocktails"
					rel="noreferrer noopener"
					className="group border-custom-brown-100 font-cardo-regular hover:bg-custom-brown-100 hover:text-custom-white-100 flex items-center justify-center rounded-full border-2 px-8 py-3 text-xl"
				>
					Battle des Cocktails
				</Link>
			</div>
		</div>
	)
}
