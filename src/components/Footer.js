import Link from 'next/link';
// import Image from 'next/image';
// import Reservation_Card from "./Reservation_Card";

const Footer = () => {
    return (
        <div className="flex bg-gray-700 w-full items-center justify-center text-white">
            <div className="flex flex-col items-center justify-center max-w-2xl w-full p-4">
                <div className="flex flex-block items-center justify-center w-full">
                    <div className="flex flex-col items-center justify-center w-full">
                        <h2>Le Bar :</h2>
                        <Link href="#">Carte</Link>
                        <Link href="#">Qui sommes-nous</Link>
                        <Link href="#">Evènements</Link>
                        <Link href="#">Ludothèque</Link>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <h2>Support :</h2>
                        <Link href="#">Contact</Link>
                        <Link href="#">Réservations</Link>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <h2>Réseaux Sociaux :</h2>
                        <div className="flex flex-block items-center justify-center w-full">
                            <div>
                                socials 1
                            </div>
                            <div>
                                socials 2
                            </div>
                            <div>
                                socials 3
                            </div>
                        </div>
                    </div>
                </div>
                <p>copyright..............</p>
            </div>
        </div>
    )
}

export default Footer;