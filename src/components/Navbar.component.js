import Link from 'next/link'

const Navbar = () => {
	return (
		<nav className='bg-gray-700 text-white'>
			<div className='container mx-auto flex items-center justify-between px-4 py-3'>
				<Link href='#' className='text-xl font-bold'>
					Logo
				</Link>

				<ul className='flex space-x-6'>
					<li>
						<Link href='#' className='hover:underline'>
							Home
						</Link>
					</li>
					<li>
						<Link href='#' className='hover:underline'>
							About
						</Link>
					</li>
					<li>
						<Link href='#' className='hover:underline'>
							Services
						</Link>
					</li>
					<li>
						<Link href='#' className='hover:underline'>
							Contact
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
