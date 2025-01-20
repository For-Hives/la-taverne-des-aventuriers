const SoftsAndHotElement = () => {
	return (
		<div className='flex w-3/4 flex-col gap-36'>
			<h2 className='font-cardinal text-8xl text-title-200 first-letter:text-title-100'>
				Soft Drink & Boissons Chaudes
			</h2>
			<div className='flex w-full items-center justify-center gap-36'>
				<div className='flex w-1/2 flex-col gap-4'>
					<h2 className='font-cardinal text-5xl text-title-200 first-letter:text-title-100'>
						Boissons Chaudes
					</h2>
					<div className='flex gap-6 font-cardinal text-2xl text-title-200'>
						<p className='flex flex-col gap-2'>
							<span>Café (Florino) [supp crème 1€]</span>
							<span>Café Moka Noisette</span>
							<span>Café du moment</span>
							<span>Café Allongé</span>
							<span>Double Expresso</span>
							<span>Chocolat Chaud [supp Viennois 1€]</span>
							<span>Thé (Noir, Ceylan, Fruits rouges, Vert)</span>
							<span>Infusion (verveine, menthe, tilleul)</span>
						</p>
						<p className='flex flex-col gap-2'>
							<span>1.8€</span>
							<span>2.3€</span>
							<span>2.3€</span>
							<span>2€</span>
							<span>3.5€</span>
							<span>3.5€</span>
							<span>3.5€</span>
							<span>3.5€</span>
						</p>
					</div>
				</div>
				<div className='flex w-1/2 flex-col gap-4'>
					<h2 className='font-cardinal text-5xl text-title-200 first-letter:text-title-100'>
						Softs Drinks
					</h2>
					<div className='flex gap-6 font-cardinal text-2xl text-title-200'>
						<p className='flex flex-col gap-2'>
							<span>Breizh Cola (classique, zero, tonic) 33cl</span>
							<span>Breizh tea 33cl</span>
							<span>Limonade 33cl</span>
							<span>Charitea mate 33cl</span>
							<span>Jus de Fruit (Granini) 33cl</span>
							<span>Sirop (Giffard) 33cl</span>
							<span>Diabolo 20cl</span>
						</p>
						<p className='flex flex-col gap-2'>
							<span>4€</span>
							<span>4€</span>
							<span>4€</span>
							<span>4€</span>
							<span>4€</span>
							<span>3€</span>
							<span>4€</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SoftsAndHotElement
