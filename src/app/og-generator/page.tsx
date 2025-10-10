import { Metadata } from 'next'

import { textToSpanColored } from '@/utils/textToSpanColored'

export const revalidate = 10

/**
 * Generates metadata for legal notice page
 */
export async function generateMetadata(): Promise<Metadata> {
	return {
		robots: {
			follow: false,
			googleBot: {
				follow: false,
				index: false,
			},
			index: false,
			nocache: true,
		},
	}
}

export default function OgGenerator() {
	return (
		<div className='min-h-screen pt-24'>
			<div className='container mx-auto h-full px-4 py-8'>
				<div className='flex h-full w-full flex-row items-center justify-between gap-8'>
					{/* Left Section - Title and Description */}
					<div className='flex w-full flex-col items-start justify-center gap-6'>
						<h1 className='font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 flex w-full flex-col gap-2 text-4xl font-bold sm:w-2/3 sm:text-5xl md:text-6xl lg:text-8xl'>
							<span
								dangerouslySetInnerHTML={{
									__html: textToSpanColored('La *T*averne Des *A*venturiers'),
								}}
							/>
						</h1>

						<div className='flex flex-col items-start gap-6 sm:gap-8 md:gap-10'>
							<p className='font-obraletra text-custom-brown-100 flex items-center gap-2 text-lg font-bold sm:gap-3 sm:text-xl md:text-2xl'>
								<span
									dangerouslySetInnerHTML={{
										__html: textToSpanColored(
											'Votre *bar* à *jeux* *N*antais favoris'
										),
									}}
								/>
							</p>
						</div>
					</div>

					{/* Right Section - Hours Table */}
					<div className='border-custom-brown-100 bg-custom-white-300 font-obraletra relative flex h-full w-[50%] -translate-y-8 transform flex-col items-start gap-6 rounded-2xl border-3 p-6 shadow-sm'>
						<h2 className='font-obraletra text-custom-brown-100 first-letter:font-obraletra-bold text-2xl'>
							Nos Horaires
						</h2>
						<table className='w-full'>
							<tbody className='divide-custom-brown-100 divide-y'>
								<tr>
									<td className='py-2 pr-8 font-bold'>Lundi</td>
									<td className='py-2'>18h00 - 00h00</td>
								</tr>
								<tr>
									<td className='py-2 pr-8 font-bold'>Mardi</td>
									<td className='py-2'>Fermé</td>
								</tr>
								<tr>
									<td className='py-2 pr-8 font-bold'>Mercredi</td>
									<td className='py-2'>15h00 - 00h00</td>
								</tr>
								<tr>
									<td className='py-2 pr-8 font-bold'>Jeudi</td>
									<td className='py-2'>18h00 - 00h00</td>
								</tr>
								<tr>
									<td className='py-2 pr-8 font-bold'>Vendredi</td>
									<td className='py-2'>18h00 - 01h00</td>
								</tr>
								<tr>
									<td className='py-2 pr-8 font-bold'>Samedi</td>
									<td className='py-2'>15h00 - 01h00</td>
								</tr>
								<tr>
									<td className='py-2 pr-8 font-bold'>Dimanche</td>
									<td className='py-2'>15h00 - 00h00</td>
								</tr>
							</tbody>
						</table>
						<p className='text-custom-brown-100 absolute bottom-0 mt-4 translate-y-24 transform text-2xl'>
							13 rue Kergévan, 44000 Nantes
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
