import { useRive } from '@rive-app/react-canvas'

export default function RiveAnimation() {
	const { RiveComponent } = useRive({
		automaticallyHandleEvents: true,
		autoplay: true,
		src: '/assets/animation/chevalier.riv',
		stateMachines: 'State Machine 1',
	})

	return <RiveComponent />
}
