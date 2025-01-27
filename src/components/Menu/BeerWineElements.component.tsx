const BeerWineElement = () => {
	return (
		<div className='flex w-full flex-col items-center justify-center gap-20 px-4 sm:px-8'>
			<h2 className='font-cardinal text-6xl text-title-200 first-letter:text-title-100 max-sm:text-6xl'>
				Bières et Vins
			</h2>
			<div className='flex w-full flex-col justify-center gap-28'>
				{/* Bières Section */}
				<div className='flex flex-col items-start justify-start gap-6'>
					<h2 className='font-cardinal text-4xl text-title-200 first-letter:text-title-100 sm:text-6xl'>
						Bières
					</h2>
					<div className='flex w-full flex-col justify-center gap-6 sm:flex-row sm:gap-28'>
						{/* Bières à la pression */}
						<div className='flex flex-col justify-center gap-6 sm:w-1/2'>
							<div className='flex justify-start gap-10 sm:gap-44'>
								<h3 className='font-cardinal text-2xl text-title-100 sm:text-4xl'>
									Pression :
								</h3>
								<p className='font-obraletra text-lg text-title-200 max-sm:text-xl'>
									<span>25cl</span>
									<span>50cl</span>
								</p>
							</div>
							<div className='flex flex-col justify-center gap-2 font-cardinal text-2xl text-title-200 max-sm:text-lg'>
								<div className='flex gap-10 sm:gap-20'>
									<h2>La moustache 4.5%</h2>
									<p className='flex gap-6'>
										<span>3.2€</span>
										<span>6€</span>
									</p>
								</div>
								<div className='flex gap-10 sm:gap-20'>
									<h2>Cidre La Mordrue 6%</h2>
									<p className='flex gap-6'>
										<span>4€</span>
										<span>7.5€</span>
									</p>
								</div>
								<div className='flex gap-10 sm:gap-20'>
									<h2>Bouffay Blanche 5%</h2>
									<p className='flex gap-6'>
										<span>4€</span>
										<span>7.5€</span>
									</p>
								</div>
								<div className='flex gap-10 sm:gap-24'>
									<h2>Titan IPA 5.5%</h2>
									<p className='flex gap-6'>
										<span>4€</span>
										<span>7.5€</span>
									</p>
								</div>
							</div>
						</div>

						{/* Bières en bouteille */}
						<div className='flex flex-col items-start justify-start gap-6 sm:w-1/2'>
							<h2 className='font-cardinal text-3xl text-title-100 sm:text-4xl'>
								Bière Bouteille : (6 €)
							</h2>
							<p className='flex flex-col font-cardinal text-2xl text-title-200 max-sm:text-lg'>
								<span>{`Linderman's Pecheresse (25cl) 1.2%`}</span>
								<span>kwak (33cl) 8.4%</span>
								<span>Mystic (kreik) (25cl) 3.2%</span>
								<span>La Blonde Bouffay (33cl) 6%</span>
								<span>{`L'Ambre Bouffay (33cl) 6.5%`}</span>
							</p>
						</div>
					</div>
				</div>

				{/* Vins Section */}
				<div className='flex w-full flex-col gap-20'>
					<h2 className='text-end font-cardinal text-4xl text-title-200 first-letter:text-title-100 max-sm:text-start sm:text-6xl'>
						Vins
					</h2>

					{/* Blanc Section */}
					<div className='flex w-full flex-col justify-center gap-6 sm:flex-row sm:gap-28'>
						<div>
							<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
								Blanc
							</h2>
							<p className='flex flex-col font-cardinal text-2xl text-title-200 max-sm:text-lg'>
								<span>{`AOP Muscadet Drouet 'Domaine Drouet Frères'`}</span>
								<span>
									{`IGP "Cote de Gascogne" Moustache Pour tous "Domaine du
									Plaimont"`}
								</span>
							</p>
						</div>
						<div className='flex flex-col justify-center font-cardinal text-2xl text-title-200 max-sm:text-lg'>
							<h2 className='flex gap-6 sm:gap-14'>
								<span>Le Verre:</span>
								<span>La Bouteille :</span>
							</h2>
							<p className='flex gap-10 sm:gap-36'>
								<span>4€</span>
								<span>18€</span>
							</p>
							<p className='flex gap-10 sm:gap-36'>
								<span>5€</span>
								<span>22€</span>
							</p>
						</div>
					</div>

					{/* Rosé Section */}
					<div className='flex w-full flex-col justify-center gap-6 sm:flex-row sm:gap-72'>
						<div className='flex flex-col justify-center font-cardinal text-2xl text-title-200 max-sm:text-lg'>
							<h2 className='flex gap-6 sm:gap-14'>
								<span>Le Verre:</span>
								<span>La Bouteille :</span>
							</h2>
							<p className='flex gap-10 sm:gap-36'>
								<span>4€</span>
								<span>18€</span>
							</p>
						</div>
						<div>
							<h2 className='text-end font-cardinal text-3xl text-title-200 first-letter:text-title-100 max-sm:text-start sm:text-4xl'>
								Rosé
							</h2>
							<p className='flex flex-col font-cardinal text-2xl text-title-200 max-sm:text-lg'>
								<span>{`AOP Muscadet Drouet 'Domaine Drouet Frères'`}</span>
							</p>
						</div>
					</div>

					{/* Rouge Section */}
					<div className='flex w-full flex-col justify-center gap-6 sm:flex-row sm:gap-72'>
						<div>
							<h2 className='font-cardinal text-3xl text-title-200 first-letter:text-title-100 sm:text-4xl'>
								Rouge
							</h2>
							<p className='flex flex-col font-cardinal text-2xl text-title-200 max-sm:text-lg'>
								<span>IGP Moustache Pour Tous “Domaine Plaimont”</span>
							</p>
						</div>
						<div className='flex flex-col justify-center font-cardinal text-2xl text-title-200 max-sm:text-lg'>
							<h2 className='flex gap-6 sm:gap-14'>
								<span>Le Verre:</span>
								<span>La Bouteille :</span>
							</h2>
							<p className='flex gap-10 sm:gap-36'>
								<span>5€</span>
								<span>22€</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BeerWineElement
