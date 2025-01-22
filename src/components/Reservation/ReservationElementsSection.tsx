import Image from 'next/image'

export default async function ReservationElementComponent() {
	return (
		<div className='flex w-4/5 font-obraletra text-base text-title-200'>
			<div className='flex h-full w-3/4 flex-col'>
				<div className='flex flex-col items-start justify-center rounded border border-title-200'>
					<h1>Qui Sommes-nous ?</h1>
					<p>
						Bienvenue à la Taverne des Aventuriers, votre bar à jeux au cœur de
						Nantes ! Située à Nantes, notre taverne est un véritable refuge pour
						les amateurs de jeux de société, de jeux de rôle et d'heroic
						fantasy. Un lieu convivial où se réunissent joueurs débutants et
						expérimentés autour d'une bonne bière et de jeux passionnants."
					</p>
				</div>

				<div className='flex'>
					<div className='flex w-1/3 flex-col items-start justify-center'>
						<div className='rounded border border-title-200'>
							<h2>Notre Histoire</h2>
							<p>
								<span>
									Née de la passion de Samuel, joueur invétéré et amateur de
									fantasy, la Taverne des Aventuriers a ouvert ses portes en
									2024 à Nantes.
								</span>
								<span>
									Notre mission : créer un lieu unique où se mêlent l'ambiance
									chaleureuse d'un pub médiéval et le plaisir du jeu.
								</span>
								<span>
									Notre taverne a été pensée pour être : - Un lieu accueillant
									pour tous les joueurs - Un espace de découverte ludique - Un
									point de rencontre pour la communauté - Une pause enchantée
									dans votre quotidien
								</span>
							</p>
						</div>
						<div className='rounded border border-title-200'>
							<h2>Notre Histoire</h2>
							<p className='flex flex-col gap-6'>
								<span>🎲 Notre Ludothèque :</span>
								<span>
									- Plus de 90 jeux de société - Tables de jeux de rôle - Jeux
									d'ambiance et party games - Grands classiques et nouveautés
								</span>
							</p>
						</div>
					</div>

					<div className='flex w-2/3 items-center justify-center rounded border border-title-200'>
						<Image
							src='/assets/images/LTDALogo.png'
							alt='LTDA Logo'
							width={520}
							height={520}
						/>
					</div>
				</div>
			</div>

			<div className='flex w-1/4 flex-col'>
				<div className='flex flex-col items-start justify-center rounded border border-title-200'>
					<h2>L'équipe</h2>
					<p className='flex flex-col gap-6'>
						<span>👑 Les Maîtres des Lieux Samuel</span>
						<span>
							🎲 Nos Maîtres du Jeu Une équipe passionnée pour vous conseiller
							et animer vos parties
						</span>
						<span>
							🍺 L'Équipe du Bar Des experts en breuvages et mets délicieux
						</span>
					</p>
				</div>

				<div className='flex h-full flex-col items-start justify-center rounded border border-title-200'>
					<h2>Informations pratiques</h2>
					<p className='flex flex-col gap-6'>
						<span>📍 Nous Trouver : 13 rue Kergévan, 44000 Nantess</span>
						<span>
							📅 Nos Horaires : Lundi : 18:00-00:00 Mardi : Fermé Mercredi :
							15:00-00:00 Jeudi : 18:00-00:00 Vendredi : 18:00-01:00 Samedi :
							15:00-01:00 Dimanche : 15:00-00:00 Note : Exceptionnel: le 1 mai,
							nous sommes ouvert
						</span>
						<span>
							📞 Nous Contacter : latavernedesaventuriers@mail.com Facebook :
							[lien] Instagram : [lien] Twitter/X : [lien]
						</span>
						<span>
							📝 Réservations : - Pour les groupes - Pour les événements - Pour
							les tables de jeu de rôle
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}
