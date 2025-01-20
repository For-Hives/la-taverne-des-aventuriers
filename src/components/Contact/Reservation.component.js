import Image from 'next/image'

const ReservationComponent = () => {
	return (
		<div className='flex w-3/4 items-center justify-center'>
			<div className='flex w-1/3 items-center justify-center'>
				<Image
					src='/assets/images/elements/ContactElements/House.png'
					alt='LTDA Logo'
					width={1080}
					height={720}
				/>
			</div>
			<div className='flex w-2/3 flex-col items-start justify-center gap-9 text-title-200'>
				<h2 className='font-cardinal text-2xl first-letter:text-title-100'>
					Réservation
				</h2>
				<p className='flex flex-col items-start gap-4 font-obraletra text-xs'>
					<span>
						Vous voulez reserver, nous poser une question, ou pour toute
						proposition de collaboration commerciale, veuillez directement nous
						contacrter par mail, ou par insta !
					</span>
					<span>
						Pour toutes demande de réservation passez par instagram directement,
						(si vous êtes un groupe de plus de 12 uniquement, sinon, la taverne
						sera là pour vous accueillir ! )
					</span>
				</p>
			</div>
		</div>
	)
}

export default ReservationComponent
