import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { HeroTextAnimated } from '@/components/Landing/animatedComponents/heroText';
// import { textToSpanColored } from '@/utils/textToSpanColored'
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import Link from 'next/link'

export default async function HeroTextComponent({
	data,
}: Readonly<{
	data: LandingPageData
}>) {
	return < HeroTextAnimated data={data} />;
}
