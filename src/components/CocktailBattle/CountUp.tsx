'use client'

import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CountUpProps {
	to: number
	from?: number
	direction?: 'up' | 'down'
	delay?: number
	duration?: number
	className?: string
	startWhen?: boolean
	separator?: string
	onStart?: () => void
	onEnd?: () => void
}

export default function CountUp({
	className = '',
	delay = 0,
	direction = 'up',
	duration = 1,
	from = 0,
	onEnd,
	onStart,
	separator = '',
	startWhen = true,
	to,
}: Readonly<CountUpProps>) {
	const ref = useRef<HTMLSpanElement>(null)
	const motionValue = useMotionValue(direction === 'down' ? to : from)

	// Calculate damping and stiffness based on duration
	const damping = 20 + 40 * (1 / duration)
	const stiffness = 100 * (1 / duration)

	const springValue = useSpring(motionValue, {
		damping,
		stiffness,
	})

	const isInView = useInView(ref, { margin: '0px', once: true })

	// Set initial text content to the initial value based on direction
	useEffect(() => {
		if (ref.current) {
			ref.current.textContent = String(direction === 'down' ? to : from)
		}
	}, [from, to, direction])

	// Start the animation when in view and startWhen is true
	useEffect(() => {
		if (isInView && startWhen) {
			if (typeof onStart === 'function') {
				onStart()
			}

			const timeoutId = setTimeout(() => {
				motionValue.set(direction === 'down' ? from : to)
			}, delay * 1000)

			const durationTimeoutId = setTimeout(
				() => {
					if (typeof onEnd === 'function') {
						onEnd()
					}
				},
				delay * 1000 + duration * 1000
			)

			return () => {
				clearTimeout(timeoutId)
				clearTimeout(durationTimeoutId)
			}
		}
	}, [
		isInView,
		startWhen,
		motionValue,
		direction,
		from,
		to,
		delay,
		onStart,
		onEnd,
		duration,
	])

	// Update text content with formatted number on spring value change
	useEffect(() => {
		const unsubscribe = springValue.on('change', latest => {
			if (ref.current) {
				const options = {
					maximumFractionDigits: 0,
					minimumFractionDigits: 0,
					useGrouping: !!separator,
				}

				const formattedNumber = Intl.NumberFormat('en-US', options).format(
					Number(latest.toFixed(0))
				)

				ref.current.textContent = separator
					? formattedNumber.replace(/,/g, separator)
					: formattedNumber
			}
		})

		return () => unsubscribe()
	}, [springValue, separator])

	return <span className={`${className}`} ref={ref} />
}
