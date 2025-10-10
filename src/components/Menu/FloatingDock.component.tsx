'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'

interface DockItemProps {
	icon: ReactNode
	title: string
	href: string
	isActive?: boolean
}

const FloatingDockItem = ({ href, icon, isActive, title }: DockItemProps) => {
	return (
		<Link
			href={href}
			className={cn(
				'group bg-custom-white-300 relative flex h-10 w-10 flex-col items-center justify-center rounded-full ' +
					'text-custom-brown-100 hover:bg-custom-brown-100 hover:text-custom-white-100 transition-all duration-300 md:h-14 md:w-14',
				isActive && 'bg-custom-brown-100 text-custom-white-100'
			)}
			onClick={e => {
				// Prevent default behavior for hash links to ensure smooth scrolling
				if (href.startsWith('#')) {
					e.preventDefault()
					const element = document.getElementById(href.substring(1))
					if (element) {
						element.scrollIntoView({ behavior: 'smooth' })
					}
				}
			}}
			aria-label={title}
		>
			<span className='h-5 w-5 transition-transform duration-300 group-hover:scale-110 md:h-7 md:w-7'>
				{icon}
			</span>
			<div className='bg-custom-brown-100 pointer-events-none absolute -top-10 right-4 w-auto min-w-max origin-bottom scale-0 rounded-md p-2 text-xs text-white shadow-md transition-all duration-200 group-hover:scale-100 md:right-auto md:left-1/2 md:-translate-x-1/2 md:transform'>
				{title}
			</div>
		</Link>
	)
}

interface FloatingDockProps {
	items: {
		title: string
		icon: ReactNode
		href: string
	}[]
	className?: string
	mobileClassName?: string
}

export function FloatingDock({
	className = '',
	items,
	mobileClassName = '',
}: FloatingDockProps) {
	const [visible, setVisible] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			// Show dock after scrolling down a bit
			if (window.scrollY > 300) {
				setVisible(true)
			} else if (window.scrollY < 100) {
				setVisible(false)
			}

			// Store the current scroll position for next comparison
			setLastScrollY(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastScrollY])

	// Determine which section is currently in viewport
	const [activeSection, setActiveSection] = useState('')

	useEffect(() => {
		const handleScroll = () => {
			const sections = items
				.map(item =>
					item.href.startsWith('#')
						? document.getElementById(item.href.substring(1))
						: null
				)
				.filter(Boolean)

			let current = ''
			sections.forEach(section => {
				if (!section) return

				const sectionTop = section.offsetTop
				const sectionHeight = section.offsetHeight

				if (
					window.scrollY >= sectionTop - 200 &&
					window.scrollY < sectionTop + sectionHeight - 200
				) {
					current = section.id
				}
			})

			if (current !== activeSection) {
				setActiveSection(current)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [activeSection, items])

	return (
		<div
			className={cn(
				'border-custom-brown-100/20 bg-custom-white-300/80 fixed right-2 bottom-2 z-50 flex transform flex-col items-center justify-center gap-2 rounded-full border px-2 py-3 shadow-lg backdrop-blur-md transition-all duration-500 md:right-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:flex-row md:px-4 md:py-2',
				!visible && 'translate-y-24 opacity-0',
				className,
				mobileClassName
			)}
		>
			{items.map((item, index) => (
				<FloatingDockItem
					key={index}
					title={item.title}
					icon={item.icon}
					href={item.href}
					isActive={
						item.href.startsWith('#') &&
						item.href.substring(1) === activeSection
					}
				/>
			))}
		</div>
	)
}
