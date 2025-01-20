import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const HeroTextComponent = () => {
	// todo : call function from the server service - getHero
	// fetch(...).then(res => res.json()).then(data => console.log(data))
	// (service Auth)
	// authenticate as auth collection record
	// const userData = await pb.collection('users').authWithPassword('test@example.com', '123456');
	// (123456) -> password -> .env
	//
	// // list and filter "example" collection records
	// const result = await pb.collection('example').getList(1, 20, {
	//     filter: 'status = true && created > "2022-08-01 10:00:00"'
	// });

	return (
		<div className='bottom-0 left-0 flex flex-col items-start gap-10 p-52'>
			{/*Hero Title*/}
			<h1 className='flex flex-col gap-2'>
				<span className='font-cardinal text-8xl font-bold text-title-200'>
					La taverne des
				</span>
				<span className='font-cardinal text-8xl font-bold text-title-200 first-letter:text-title-100'>
					Aventuriers
				</span>
			</h1>

			<div className='flex flex-col items-start gap-9'>
				{/*Description*/}
				<p className='flex items-center gap-1'>
					<span className='font-obraletra text-2xl text-title-200'>
						Votre bar à{' '}
					</span>
					<span className='font-obraletra text-2xl text-title-100'>
						Jeux Nantais
					</span>
					<span className='font-obraletra text-2xl text-title-200'>
						favoris !
					</span>
				</p>

				{/*Button div*/}
				<div className='flex flex-wrap items-start gap-6'>
					{/*Button 1*/}
					<button className='flex items-center gap-4 rounded bg-title-200 p-2 font-obraletra text-xl text-title-300'>
						<Link href='/menu' className='hover:underline'>
							Servez-vous
							<FontAwesomeIcon
								icon={faChevronRight}
								className='text-title-300'
							/>
						</Link>
					</button>

					{/*Button 2*/}
					<button className='rounded border-3 border-solid border-title-200 p-1 font-obraletra text-xl text-title-200'>
						<Link href='/gamelibrary' className='hover:underline'>
							Découvrez nos Jeux
						</Link>
					</button>
				</div>
			</div>
		</div>
	)
}
export default HeroTextComponent
