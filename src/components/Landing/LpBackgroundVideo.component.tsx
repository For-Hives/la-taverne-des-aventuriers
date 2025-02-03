'use client'

import { useEffect, useState } from 'react'

export default function BackgroundVideoLP() {
	const [isLoaded, setIsLoaded] = useState(false)

	// add a delay to the video to load
	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true)
		}, 3500)
	}, [])

	return (
		isLoaded && (
			<div className='video-background mask relative clear-both m-0 min-h-[110vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0'>
				<iframe
					title='Animation_Carte_1'
					className='mask-custom animate-video absolute left-0 top-0 -z-10 block h-full w-full bg-customWhite-100 object-cover object-center opacity-75 mix-blend-normal'
					src='https://player.vimeo.com/video/1047422333?h=3ee0913fe6&background=1&autoplay=1&loop=0'
					allow='autoplay'
					data-ready='true'
					allowFullScreen
				/>
			</div>
		)
	)
}
