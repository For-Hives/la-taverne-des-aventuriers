'use client'
import Player from '@vimeo/player'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

export default function BackgroundVideoLP() {
	// Create a reference for the div container where the iframe will be added
	const videoContainerRef = useRef<HTMLDivElement | null>(null)
	// Get the current pathname (URL path) of the page
	const pathname = usePathname() // Retrieves the current path

	useEffect(() => {
		// If the video container is not available, exit early
		if (!videoContainerRef.current) return

		// Remove any existing iframe elements in the container
		while (videoContainerRef.current.firstChild) {
			videoContainerRef.current.removeChild(videoContainerRef.current.firstChild)
		}

		// Create a new iframe element to embed the Vimeo player
		const iframe = document.createElement('iframe')
		iframe.src = 'https://player.vimeo.com/video/1047422333?h=3ee0913fe6&background=1&autoplay=1&loop=0'
		iframe.title = 'Animation_Carte_1'
		iframe.width = '1920'
		iframe.height = '1080'
		iframe.className =
			'mask-custom mix-difference animate-video bg-lp-blured-image absolute left-0 top-0 -z-10 block object-cover object-center opacity-75 transition'

		// Append the created iframe to the container reference
		videoContainerRef.current.appendChild(iframe)

		// Initialize the Vimeo player with the iframe
		const player = new Player(iframe)
		let videoDuration = 0
		const loopStart = 4 // Set the time (in seconds) to loop from

		// When the player has loaded, get the video's total duration
		player.on('loaded', () => {
			player.getDuration().then(duration => {
				videoDuration = duration
			})
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

	// Return a div container where the video iframe will be embedded
	return <div ref={videoContainerRef}></div>
}
