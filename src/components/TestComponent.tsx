'use client'
import { useState } from 'react'

export default function TestComponent() {
	const [count, setCount] = useState(0)

	const increment = () => {
		setCount(count + 1)
	}

	const decrement = () => {
		setCount(count - 1)
	}

	return (
		<div className='flex h-[60vh] flex-col items-center justify-center gap-20'>
			{/* Button to increment  / decrement the data-count */}
			<div className={"flex gap-4 justify-center w-full"}>
				<button onClick={increment} className={"btn btn-primary"}>Increment</button>
				<button onClick={decrement} className={"btn btn-primary"}>Decrement</button>
			</div>

			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={392}
				height={403}
				fill='none'
				data-count={count}
				className={"*:fill-black animation-count"}
			>
				<path
					fillRule='evenodd'
					d='M47 403V3h8v400h-8Z'
					clipRule='evenodd'
					className={"line_1"}
				/>
				<path
					fillRule='evenodd'
					d='M147 403V3h8v400h-8Z'
					clipRule='evenodd'
					className={"line_2"}
				/>
				<path
					fillRule='evenodd'
					d='M247 403V3h8v400h-8Z'
					clipRule='evenodd'
					className={"line_3"}
				/>
				<path
					fillRule='evenodd'
					d='M347 403V3h8v400h-8Z'
					clipRule='evenodd'
					className={"line_4"}
				/>
				<path
					fillRule='evenodd'
					d='m391.501 7.5-384 384-7.071-7.071 384-384 7.071 7.07Z'
					clipRule='evenodd'
					className={"line_5"}
				/>
			</svg>
		</div>
	)
}
