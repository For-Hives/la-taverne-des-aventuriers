import { useRive } from '@rive-app/react-canvas';

export default function RiveAnimation() {
    const { rive, RiveComponent } = useRive({
        src: '/assets/animation/chevalier.riv',
        stateMachines: "bumpy",
        autoplay: true,

    });

    return (
        <RiveComponent />
    );
}
