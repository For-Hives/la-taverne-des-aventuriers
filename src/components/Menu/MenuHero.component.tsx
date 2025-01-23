export default function MenuHeroComponent() {
	return (
		<div className={'relative'}>
			<div>
				<div className='absolute left-1/2 top-[40%] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
					<h1 className='font-cardinal text-8xl text-title-200 opacity-100 first-letter:text-title-100'>
						Carte
					</h1>
					<p className='text-center font-obraletra text-xl text-title-200'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
						turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut ipsum
						et libero pretium viverra. Nullam sed lacus enim. Sed tincidunt
						tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc tempus eget
						augue at interdum. Aliquam in maximus nisl. Duis accumsan venenatis
						dui, dignissim congue leo scelerisque in.
					</p>
				</div>
				<div className='mask-custom h-[115vh] min-h-[115vh] w-[100vw] bg-menuBGImage bg-cover bg-center opacity-75' />
			</div>
		</div>
	)
}
