'use client'

import Player from '@vimeo/player'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function BackgroundVideoLP() {
	// Create a reference for the div container where the iframe will be added
	const videoContainerRef = useRef<HTMLDivElement | null>(null)

	// Get the current pathname (URL path) of the page
	const pathname = usePathname()

	useEffect(() => {
		// If the video container is not available, exit early
		if (!videoContainerRef.current) return

		// Remove any existing iframe elements in the container
		while (videoContainerRef.current.firstChild) {
			videoContainerRef.current.removeChild(
				videoContainerRef.current.firstChild
			)
		}

		// Create a new iframe element to embed the Vimeo player
		const iframe = document.createElement('iframe')
		// Enable autoplay directly in the URL instead of manually triggering it later
		iframe.src =
			'https://player.vimeo.com/video/1047422333?h=3ee0913fe6&background=1&autoplay=1&loop=1&autopause=0'
		iframe.title = 'Animation_Carte_1'
		iframe.className =
			'mask-custom animate-video absolute left-0 top-0 -z-10 block h-full w-full bg-custom-white-100 object-cover object-center opacity-75 mix-blend-normal'
		iframe.allow = 'autoplay; fullscreen'
		iframe.setAttribute('data-ready', 'true')
		iframe.loading = 'lazy' // Add lazy loading
		iframe.allowFullscreen = true

		// Append the created iframe to the container reference
		videoContainerRef.current.appendChild(iframe)

		// Initialize the Vimeo player with the iframe
		const player = new Player(iframe)

		// Cleanup the player when the component is unmounted or the pathname changes
		return () => {
			player.destroy()
		}
	}, [pathname]) // This effect runs every time the pathname (URL path) changes

	return (
		<div className='video-background mask relative clear-both m-0 min-h-[110vh] w-screen max-w-screen overflow-x-hidden p-0'>
			<div ref={videoContainerRef} className='h-full w-full' />
		</div>
	)
}
