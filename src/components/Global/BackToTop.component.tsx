'use client'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

export default function BackToTop() {
	// State to manage the visibility of the button
	const [isVisible, setIsVisible] = useState(false)

	// Effect to handle scroll and toggle the visibility of the button
	useEffect(() => {
		// Function to handle the scroll event
		const handleScroll = () => {
			// If scrolled more than 300px, show the button, else hide it
			if (window.scrollY > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		// Add the scroll event listener
		window.addEventListener('scroll', handleScroll)

		// Cleanup: Remove the event listener when the component is unmounted
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, []) // Empty dependency array to run only once on component mount

	// Function to scroll smoothly to the top of the page
	const scrollToTop = () => {
		window.scrollTo({
			behavior: 'smooth', // Smooth scrolling
			top: 0, // Scroll to the top of the page
		})
	}

	// Calculate the remaining space to ensure the button doesn't go under the footer
	const getPosition = () => {
		// Get the footer element
		const footer = document.querySelector('footer')
		if (footer) {
			// Get the position of the footer
			const footerPosition = footer.getBoundingClientRect()

			// If the footer is visible, adjust the button position
			return footerPosition.top < window.innerHeight ? 'bottom-16' : 'bottom-4'
		}
		// Default position if footer is not found
		return 'bottom-4'
	}

	// Render the button if it's visible
	return (
		isVisible && (
			<button
				onClick={scrollToTop} // Handle click to scroll to top
				className={`fixed right-4 ${getPosition()} z-50 items-center justify-center rounded-full bg-customWhite-400 p-2 text-customBrown-100 opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:bg-customBrown-100 hover:text-customWhite-400 hover:opacity-100 sm:right-6`}
				aria-label='Retour en haut' // Accessibility label for the button
			>
				<FontAwesomeIcon
					icon={faArrowUp} // Icon for the button
					className='h-5 w-6 rounded-full px-1 py-1' // Size and style for the icon
				/>
			</button>
		)
	)
}
