import Image from 'next/image'

const HowToContact = () => {
	return (
		<div className='flex w-3/4 items-center justify-center'>
			<div className='flex w-1/3 items-center justify-end'>
				<Image
					src='/assets/images/elements/HowtoContact.png'
					alt='LTDA Logo'
					width={300}
					height={300}
				/>
			</div>

			<div className='flex w-2/3 flex-col items-start justify-center gap-10 font-obraletra text-base text-title-200'>
				<h1 className='items-center justify-center text-center font-cardinal text-2xl first-letter:text-title-100'>
					Comment nous contacter ?
				</h1>
				<div className='flex flex-col items-start gap-3 text-xs'>
					<p>
						Vous voulez reserver, nous poser une question, ou pour toute
						proposition de collaboration commerciale, veuillez directement nous
						contacrter par mail, ou par insta !
					</p>
					<p>
						Pour toutes demande de réservation passez par instagram directement,
						(si vous êtes un groupe de plus de 12 uniquement, sinon, la taverne
						sera là pour vous accueillir ! )
					</p>
				</div>
			</div>
		</div>
	)
}

export default HowToContact
