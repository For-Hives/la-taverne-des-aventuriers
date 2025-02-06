'use client'

import { ContactPageData } from "@/app/actions/services/getContactPageData.service"; // Importing data type for contact page
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"; // Importing social media icons from FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing the FontAwesomeIcon component
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motion
import Image from "next/image"; // Importing the Image component from Next.js for optimized image loading

// Defining the component that displays the animated contact section
export const AnimatedContactElementSection = ({ data }: { data: ContactPageData }) => {
    return (
        <div className='flex w-3/4 items-center justify-center gap-8 p-8 max-xl:flex-col'>
            {/* This is the grid layout that holds all the contact information */}
            <div className='grid w-1/2 max-w-6xl grid-cols-1 gap-8 max-xl:w-full xl:grid-cols-2'>
                {/* This is the Business Hours section */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }} // Initial state: element starts off-screen (invisible and 100px down)
                    whileInView={{ opacity: 1, y: 0 }} // Animate to visible and move up when the element enters the viewport
                    viewport={{ once: true }} // Animation triggers only once
                    transition={{ duration: 0.8 }} // Duration of the animation
                    className='flex flex-col items-start gap-6 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 font-obraletra shadow'
                >
                    <h1 className='font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
                        {data.schedules_title}
                    </h1>
                    <p className='text-customBrown-100 [&>span]:block font-cardoRegular'>
                        {/* Displaying each day's schedule */}
                        <span>{data.schedules_exceptional}</span>
                        <span>{data.schedules_monday}</span>
                        <span>{data.schedules_tuesday}</span>
                        <span>{data.schedules_wednesday}</span>
                        <span>{data.schedules_thursday}</span>
                        <span>{data.schedules_friday}</span>
                        <span>{data.schedules_saturday}</span>
                        <span>{data.schedules_sunday}</span>
                    </p>
                </motion.div>

                {/* This is the Contact and Email section */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }} // Same animation as the first block
                    whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
                    viewport={{ once: true }} // Triggers only once
                    transition={{ duration: 0.8 }}
                    className='flex flex-col gap-6 font-obraletra'
                >
                    {/* This block contains the social media links */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className='flex flex-col items-center gap-4 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 shadow'
                    >
                        <h2 className='w-full font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
                            {data.contact_socials_title}
                        </h2>
                        <div className='flex items-center justify-evenly gap-10'>
                            {/* Social Media Icons */}
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400'>
                                <FontAwesomeIcon icon={faFacebook} className='h-8 w-8 text-customBrown-100' />
                            </div>
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400'>
                                <Image src='/assets/images/elements/ContactElements/myludo_icon.png' alt='MyLudo Icon' className='h-8 w-8' width={200} height={200} />
                            </div>
                            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-customWhite-400'>
                                <FontAwesomeIcon icon={faInstagram} className='h-8 w-8 text-customBrown-100' />
                            </div>
                        </div>
                    </motion.div>

                    {/* This block displays the contact email */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className='relative flex flex-col gap-6 font-obraletra'
                    >
                        <div className='flex flex-col items-start gap-4 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 shadow'>
                            <h2 className='font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
                                {data.contact_email_title}
                            </h2>
                            <p className='text-customBrown-100 font-cardoRegular'>{data.email}</p>
                        </div>
                        <div className='relative'>
                            <Image
                                src='/assets/images/elements/ContactElements/petite_bestiole.png'
                                alt='Petite Bestiole'
                                className='absolute bottom-[-3vh] -z-20 right-0 h-20 w-20 object-contain'
                                width={80}
                                height={80}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* This is the section for decorative images */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className='relative flex w-1/2 justify-end max-xl:w-full max-xl:justify-center'
            >
                {/* Decorative images like the runes and dragon */}
                <Image
                    src='/assets/images/elements/ContactElements/runes.png'
                    alt='Runes'
                    className='absolute left-20 top-[-4vh] h-1/4 w-1/4 object-contain'
                    width={150}
                    height={150}
                />
                <Image
                    src='/assets/images/elements/ContactElements/dragon.png'
                    alt='Dragon'
                    className='h-1/2 w-1/2 max-xl:h-fit max-xl:w-1/3 max-lg:w-1/2'
                    width={400}
                    height={400}
                />
            </motion.div>
        </div>
    );
}
