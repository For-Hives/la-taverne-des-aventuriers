'use client'

import { ContactPageData } from "@/app/actions/services/getContactPageData.service";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Image from "next/image";
import Link from "next/link";

export const AnimatedMapSectionComponent = ({ data }: { data: ContactPageData }) => {
    return (
        <div className='flex w-full flex-col items-center gap-8 p-8 font-obraletra text-customBrown-100 lg:flex-row lg:p-16'>
            {/* Text Section */}
            <motion.div
                className='flex w-full flex-col items-start gap-8 lg:w-1/3'
                initial={{ opacity: 0, y: 50 }} // Initial state: hidden and slightly offset
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view: fade in and slide up
                viewport={{ once: true }} // Trigger animation only once
                transition={{ duration: 0.8 }} // Transition duration
            >
                {/* Title of the address */}
                <motion.h1
                    className='font-cardinal text-4xl first-letter:text-customRed-100 lg:text-6xl'
                    initial={{ opacity: 0, x: -50 }} // Start from left with opacity 0
                    whileInView={{ opacity: 1, x: 0 }} // Fade in and slide to normal position
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {data.adress_title} {/* Display the address title */}
                </motion.h1>
                {/* Address */}
                <motion.p
                    className='text-xl lg:text-3xl'
                    initial={{ opacity: 0, y: 30 }} // Start from below
                    whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    {data.address} {/* Display the address */}
                </motion.p>
                {/* Button linking to the URL */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} // Start from below
                    whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <Link
                        target='_blank'
                        href={data.button_url}
                        className='flex items-center border-3 border-customBrown-100 justify-center rounded bg-customBrown-100 py-3 gap-8 font-cardoRegular px-8 text-lg text-customWhite-100 transition hover:border-3 hover:border-customBrown-100 hover:text-customBrown-100 hover:bg-customWhite-100 lg:text-xl'
                    >
                        {data.button_label}
                        {/* Chevron icon for the button */}
                        <FontAwesomeIcon icon={faChevronRight} className='h-4 lg:h-5' />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Image Section */}
            <motion.div
                className="relative w-full lg:w-2/3 maskMap"
                initial={{ opacity: 0 }} // Start with opacity 0
                whileInView={{ opacity: 1 }} // Fade in when in view
                viewport={{ once: true }} // Trigger animation only once
                transition={{ duration: 0.8 }} // Transition duration
            >
                {/* Image for small screens */}
                <div className="block lg:hidden">
                    <Image
                        src='/assets/images/map2.png' // Image source for small screens
                        alt='Map for small screens'
                        width={1920}
                        height={1080}
                        className='h-auto w-full rounded-lg shadow-md object-cover'  /* Image that fills the container */
                    />
                </div>

                {/* Image for large screens */}
                <div className="hidden lg:block">
                    <Image
                        src='/assets/images/map.png' // Image source for large screens
                        alt='Map for large screens'
                        width={1920}
                        height={1080}
                        className='h-auto w-full rounded-lg shadow-md object-cover'  /* Image that fills the container */
                    />
                </div>
            </motion.div>
        </div>
    );
}
