'use client'

import {ContactPageData} from "@/app/actions/services/getContactPageData.service";
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Image from "next/image";

export const AnimatedHowToContactComponent = ({ data }: { data: ContactPageData }) => {
    return (
        <div className='flex w-3/4 items-center justify-center max-sm:flex-col max-sm:gap-8'>
            {/* Image Section */}
            <motion.div
                className='flex w-1/3 items-center justify-end'
                initial={{ opacity: 0, x: -100 }} // Initial state: hidden and offset
                whileInView={{ opacity: 1, x: 0 }} // Animate when in view: fade in and slide
                viewport={{ once: true }} // Trigger animation only once
                transition={{ duration: 0.8 }} // Transition duration
            >
                <Image
                    src='/assets/images/elements/HowtoContact.png'
                    alt='Howto Contact image'
                    width={300}
                    height={300}
                />
            </motion.div>

            {/* Text Section */}
            <motion.div
                className='flex w-2/3 flex-col items-start justify-center gap-9 font-obraletra text-base text-customBrown-100 max-sm:w-full max-sm:items-center'
                initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly offset
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view: fade in and slide up
                viewport={{ once: true }} // Trigger animation only once
                transition={{ delay: 0.2, duration: 1 }} // Delay for sequential animation
            >
                {/* Title */}
                <motion.h1
                    className='items-center justify-center text-center font-cardinal text-3xl md:text-4xl first-letter:text-customRed-100'
                    initial={{ opacity: 0, x: -50 }} // Start from left with opacity 0
                    whileInView={{ opacity: 1, x: 0 }} // Fade in and slide to normal position
                    viewport={{ once: true }} // Trigger only once
                    transition={{ duration: 0.6 }}
                >
                    {data.howtosection_title}
                </motion.h1>

                {/* Description (with HTML content) */}
                <motion.div
                    className='flex flex-col font-cardoRegular items-start gap-3 text-base'
                    initial={{ opacity: 0, y: 30 }} // Start from below with opacity 0
                    whileInView={{ opacity: 1, y: 0 }} // Fade in and move up
                    viewport={{ once: true }} // Trigger only once
                    transition={{ delay: 0.4, duration: 0.8 }} // Delay for smooth sequence
                    dangerouslySetInnerHTML={{
                        __html: data.howtosection_description,
                    }}
                />
            </motion.div>
        </div>
    );
}
