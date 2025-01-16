import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
	return (
		<nav>
			<div className='bg-title-300 mx-auto flex items-center justify-evenly px-4 py-3 max-w-5xl w-full rounded'>
				<ul className='flex space-x-6  gap-16 text-title-200 font-kcobraletra text-sm items-center'>
					<li>
						<Link href='/'>
							<Image src="/assets/LTDA_Logo.png" alt="LTDA Logo" width={50} height={50} />
						</Link>
					</li>
					<li>
						<Link href='/who_are_we' className='hover:underline'>
							Qui Sommes-nous
						</Link>
					</li>
					<li>
						<Link href='/menu' className='hover:underline'>
							Carte
						</Link>
					</li>
					<li>
						<Link href='/gamelibrary' className='hover:underline'>
							Ludothèque
						</Link>
					</li>
					<li>
						<Link href='/events' className='hover:underline'>
							Evènements
						</Link>
					</li>
					<li>
						<Link href='/contacts' className='hover:underline'>
							Contact
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
