'use client'
import { GamesPageData } from "@/app/actions/services/getGamePageData.service"; // Importing the type for game page data
import { motion } from "framer-motion"; // Importing motion from Framer Motion for animations

// The component takes 'data' of type 'GamesPageData' as a prop
export const AnimatedGLHeroComponent = ({ data }: { data: GamesPageData }) => {
    return (
        <div className={'relative'}>
            <div>
                {/* Hero section text container, positioned in the center of the screen */}
                <div className='absolute left-1/2 top-[45vh] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
                    {/* Hero title with animation */}
                    <motion.h1
                        className='font-cardinal text-8xl text-customBrown-100 opacity-100 first-letter:text-customRed-100 max-sm:text-7xl'
                        initial={{ opacity: 0 }} // Initial opacity for fade-in animation
                        animate={{ opacity: 1 }} // Final opacity when fully visible
                        transition={{ duration: 0.6 }} // Duration of the fade-in animation
                    >
                        {data.games_hero_title} {/* Displays the hero title */}
                    </motion.h1>

                    {/* Hero description with HTML content */}
                    <motion.div
                        initial={{opacity: 0, y: 100}} // Start the animation off-screen (invisible and 100px down)
                        animate={{opacity: 1, y: 0}} // Make it fade in and slide up when the element enters the viewport
                        transition={{duration: 0.8}} // Duration for this animation

                        className='text-center font-obraletra text-xl text-customBrown-100 max-sm:text-sm'
                        dangerouslySetInnerHTML={{
                            __html: data.games_hero_description, // Insert the hero description as HTML
                        }}
                    >
                    </motion.div>
                </div>

                {/* Background image with opacity effect */}
                <div className='mask-custom h-[115vh] min-h-[115vh] w-[100vw] bg-menu-background-image bg-cover bg-center opacity-75' />
            </div>
        </div>
    )
}
