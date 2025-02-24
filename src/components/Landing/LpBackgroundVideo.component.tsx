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
		// Disable autoplay to manually control when playback starts
		iframe.src =
			'https://player.vimeo.com/video/1047422333?h=3ee0913fe6&background=1&autoplay=0&loop=0'
		iframe.title = 'Animation_Carte_1'
		iframe.className =
			'mask-custom animate-video absolute left-0 top-0 -z-10 block h-full w-full bg-customWhite-100 object-cover object-center opacity-75 mix-blend-normal'
		iframe.allow = 'autoplay'
		iframe.setAttribute('data-ready', 'true')
		iframe.allowFullscreen = true

		// Append the created iframe to the container reference
		videoContainerRef.current.appendChild(iframe)

		// Initialize the Vimeo player with the iframe
		const player = new Player(iframe)
		let videoDuration = 0
		const loopStart = 4 // Set the time (in seconds) to loop from
		const startDelay = 1000 // 1 second delay in milliseconds

		// When the player has loaded, get the video's total duration
		player.on('loaded', () => {
			// Wait 1 second before starting playback
			setTimeout(() => {
				player
					.play()
					.then(() => {
						// Get duration after playback has started
						player.getDuration().then(duration => {
							videoDuration = duration
						})
					})
					.catch(error => {
						console.error('Error starting video playback:', error)
					})
			}, startDelay)
		})

		// When the video ends, jump to the loop start time and play again
		player.on('ended', () => {
			player.setCurrentTime(videoDuration - loopStart).then(() => {
				player.play()
			})
		})

		// Cleanup the player when the component is unmounted or the pathname changes
		return () => {
			player.destroy()
		}
	}, [pathname]) // This effect runs every time the pathname (URL path) changes

	return (
		<div className='video-background mask relative clear-both m-0 min-h-[110vh] w-[100vw] max-w-[100vw] overflow-x-hidden p-0'>
			<div ref={videoContainerRef} className='h-full w-full' />
		</div>
	)
}
