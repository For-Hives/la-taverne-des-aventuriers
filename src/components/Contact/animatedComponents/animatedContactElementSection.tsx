'use client'


import {ContactPageData} from "@/app/actions/services/getContactPageData.service";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion' // Importing motion for animations from Framer Motions
import Image from "next/image";

export const AnimatedContactElementSection = ({ data }: { data: ContactPageData }) => {
    return (
        <div className='flex w-3/4 items-center justify-center gap-8 p-8 max-xl:flex-col'>
            {/* Grid Layout for Contact Sections */}
            <div className='grid w-1/2 max-w-6xl grid-cols-1 gap-8 max-xl:w-full xl:grid-cols-2'>
                {/* Bloc Horaires (Business Hours) */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }} // Start the animation off-screen
                    whileInView={{ opacity: 1, y: 0 }} // Make it fade in and slide up when it enters the viewport
                    viewport={{ once: true }} // Animation triggers once
                    transition={{ duration: 0.8 }} // Duration for the animation
                    className='flex flex-col items-start gap-6 rounded-2xl border-3 border-customBrown-100 bg-customWhite-300 p-6 font-obraletra shadow'
                >
                    <h1 className='font-obraletra text-2xl text-customBrown-100 first-letter:font-obraletraBold'>
                        {data.schedules_title}
                    </h1>
                    <p className='text-customBrown-100 [&>span]:block font-cardoRegular'>
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

                {/* Bloc Contact et Email (Contact and Email) */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }} // Same animation as the first block
                    whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
                    viewport={{ once: true }} // Triggers once when it enters the viewport
                    transition={{ duration: 0.8 }}
                    className='flex flex-col gap-6 font-obraletra'
                >
                    {/* Bloc Contact (Social Media) */}
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

                    {/* Bloc Email */}
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
                                className='absolute bottom-[-2rem] -z-20 right-0 h-20 w-20 object-contain'
                                width={80}
                                height={80}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative Images (Dragon, Runes) */}
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className='relative flex w-1/2 justify-end max-xl:w-full max-xl:justify-center'
            >
                <Image
                    src='/assets/images/elements/ContactElements/runes.png'
                    alt='Runes'
                    className='absolute left-20 top-[-4rem] h-1/4 w-1/4 object-contain'
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
