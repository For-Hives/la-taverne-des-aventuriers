import { useRive } from '@rive-app/react-canvas';

export default function RiveAnimation() {
    const { rive, RiveComponent } = useRive({
        src: '/assets/animation/chevalier.riv',
        stateMachines: "State Machine 1",
        autoplay: true,

    });

    return (
        <RiveComponent />
    );
}
