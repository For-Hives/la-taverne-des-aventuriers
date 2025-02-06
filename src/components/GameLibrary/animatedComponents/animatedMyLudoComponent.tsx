'use client'
import { GamesPageData } from "@/app/actions/services/getGamePageData.service"; // Importing the type for game page data
import { motion } from "framer-motion"; // Importing motion from Framer Motion for animations
import Image from "next/image"; // Importing Next.js Image component for optimized image rendering
import Link from "next/link"; // Importing Next.js Link component for client-side navigation

// The component takes 'data' of type 'GamesPageData' as a prop
export const AnimatedMyLudoComponent = ({ data }: { data: GamesPageData }) => {
    return (
        <div className='w-3/4 py-8 sm:w-3/4 sm:py-16'>
            <div className='flex w-full flex-col items-start justify-center gap-8 sm:gap-12'>
                {/* Title for the component */}
                <h2 className='font-obraletraBold text-xl text-customBrown-100 sm:text-2xl'>
                    {data.myludo_component_title} {/* Displays the title */}
                </h2>

                {/* Motion container for the image and link */}
                <motion.div
                    className='relative flex w-full flex-col items-center justify-center rounded-lg overflow-hidden'
                    initial={{ opacity: 0, y: 100 }} // Start the animation with opacity 0 and position 100px down
                    whileInView={{ opacity: 1, y: 0 }} // Fade in and move up to normal position when in view
                    transition={{ duration: 0.8 }} // Duration for the transition
                    viewport={{ once: true }} // Trigger the animation only once when the element comes into view
                >
                    {/* Link to the game library, wrapped around the image */}
                    <Link
                        className='relative block'
                        href={data.myludo_component_url} // URL for the link
                    >
                        {/* Container for the image with hover scale effect */}
                        <div className='relative w-full h-auto transition-transform duration-300 transform hover:scale-105'>
                            {/* Image component displaying the game library */}
                            <Image
                                src='/assets/images/elements/GameLibraryElements/MyLudoImage.png'
                                alt='MyLudo Logo' // Alt text for accessibility
                                className='h-auto w-full' // Make sure the image fits the width of its container
                                width={1920} // Width of the image
                                height={1080} // Height of the image
                            />
                            {/* Overlay gradient on top of the image */}
                            <div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>
                        </div>

                        {/* Link text, displayed on top of the image */}
                        <span className='absolute bottom-5 left-10 text-center font-obraletra text-xl text-customWhite-100 hover:underline sm:text-2xl'>
                            {data.myludo_component_label} {/* Displayed text for the link */}
                        </span>
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
