import Link from 'next/link'
// import Image from 'next/image';
// import Navbar from "./Navbar.component";

const Reservation_Card = () => {
	return (
		<div className='mx-auto w-3/4 gap-20 rounded-lg bg-gray-700 p-10 py-5'>
			<div className='items-left'>
				<h1 className='text-left'>Comment Réserver ?</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
					turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum et
					libero pretium viverra. Nullam sed lacus enim. Sed tincidunt tincidunt
					urna, in lacinia ipsum ullamcorper eu. Nunc tempus eget augue at
					interdum. Aliquam in maximus nisl. Duis accumsan venenatis dui,
					dignissim congue leo scelerisque in. Sed hendrerit efficitur viverra.
				</p>
				<button className='rounded-lg bg-amber-100'>
					<Link href='#' className='text-gray-800 hover:underline'>
						Réservez
					</Link>
				</button>
			</div>
		</div>
	)
}
export default Reservation_Card
