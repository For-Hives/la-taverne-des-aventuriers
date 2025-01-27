'use client'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

export default function BackToTop() {
	const [isVisible, setIsVisible] = useState(false)

	// Effet pour surveiller le scroll
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setIsVisible(true) // Afficher le bouton si on a défilé plus de 300px
			} else {
				setIsVisible(false) // Cacher le bouton si on est au début de la page
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	// Fonction pour revenir en haut de la page
	const scrollToTop = () => {
		window.scrollTo({
			behavior: 'smooth', // Assure-toi d'utiliser `behavior: smooth` ici pour le défilement fluide
			top: 0,
		})
	}

	return (
		isVisible && (
			<button
				onClick={scrollToTop}
				className='fixed bottom-8 right-8 rounded-full bg-title-700 p-4 text-title-200 shadow-lg transition-all duration-300 ease-in-out hover:bg-title-200 hover:text-title-700'
				aria-label='Retour en haut'
			>
				<FontAwesomeIcon
					icon={faArrowUp}
					className='h-6 w-6 rounded-full p-2'
				/>
			</button>
		)
	)
}
