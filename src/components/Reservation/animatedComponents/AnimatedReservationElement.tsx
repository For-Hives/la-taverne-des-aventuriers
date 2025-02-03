'use client'
import { WhoAreWePageData } from '@/app/actions/services/getWhoAreWePageData.service' // Importing data type for the page
import { motion } from 'framer-motion'; // Importing framer-motion for animations
import Image from 'next/image'; // Importing Image component for handling images

// Component to render animated reservation elements with the provided data
export const AnimatedReservationElement = ({ data }: { data: WhoAreWePageData }) => {
  return (
    <div className="flex h-full w-11/12 items-center justify-center font-cardoRegular text-customBrown-100">
      {/* Grid layout for the content */}
      <div className="grid h-full w-full grid-cols-1 grid-rows-10 gap-4 sm:grid-cols-2 xl:grid-cols-10">

        {/* Card 1 - Top Left */}
        <motion.div
          className="col-span-1 row-span-2 flex items-center justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-2 sm:row-span-2 xl:col-span-8 xl:row-span-3"
          initial={{ opacity: 0, y: 50 }} // Initial opacity and vertical position for animation
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original vertical position
          transition={{ delay: 0.2, duration: 0.8 }} // Delay and duration for the animation
        >
          <div
            className="relative flex h-full w-full items-center overflow-hidden rounded-xl px-5 sm:px-10 xl:px-20"
            style={{
              backgroundImage: `url(${data.image_card1})`, // Dynamic background image from data
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            {/* Gradient overlay for the background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-customWhite-300/100 via-customWhite-300/100 to-customWhite-300/20" />

            {/* Content */}
            <div className="relative z-10 flex-col">
              <h1 className="font-cardinal text-2xl tracking-wider first-letter:text-customRed-100 sm:text-3xl">
                {data.who_are_we_title} {/* Dynamic title */}
              </h1>
              <div
                dangerouslySetInnerHTML={{ __html: data.description_card_1 }} // Injecting HTML content for description
              />
            </div>
          </div>
        </motion.div>

        {/* Card 2 - Middle Left */}
        <motion.div
          className="col-span-1 row-span-2 flex flex-col items-start justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-1 sm:row-span-4 xl:col-span-2"
          initial={{ opacity: 0, x: -50 }} // Initial opacity and horizontal position for animation
          animate={{ opacity: 1, x: 0 }} // Animate to full opacity and original horizontal position
          transition={{ delay: 0.4, duration: 0.8 }} // Delay and duration for the animation
        >
          <div className="p-6">
            <h2 className="font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl">
              {data.team_title} {/* Dynamic title for the team */}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: data.description_card_4 }} // Injecting HTML content for description
            />
          </div>
        </motion.div>

        {/* Card 3 - Middle Right */}
        <motion.div
          className="col-span-1 row-span-2 flex flex-col items-start justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-1 sm:row-span-4 xl:col-span-2"
          initial={{ opacity: 0, x: 50 }} // Initial opacity and horizontal position for animation
          animate={{ opacity: 1, x: 0 }} // Animate to full opacity and original horizontal position
          transition={{ delay: 0.6, duration: 0.8 }} // Delay and duration for the animation
        >
          <div className="p-6">
            <h2 className="font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl">
              {data.our_history_title} {/* Dynamic title for history */}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: data.description_card_2 }} // Injecting HTML content for description
            />
          </div>
        </motion.div>

        {/* Central Logo */}
        <motion.div
          className="bg-tan-200 relative col-span-1 row-span-3 flex items-center justify-center rounded-xl border border-customBrown-100 bg-customWhite-300 max-xl:hidden sm:col-span-2 sm:row-span-10 xl:col-span-6"
          initial={{ opacity: 0 }} // Initial opacity for animation
          animate={{ opacity: 1 }} // Animate to full opacity
          transition={{ delay: 0.8, duration: 0.8 }} // Delay and duration for the animation
        >
          <Image
            src="/assets/images/LTDALogo.png" // Logo image source
            alt="LTDA Logo" // Alt text for accessibility
            width={520}
            height={520}
          />
          {/*<Image*/}
          {/*  src="/assets/images/elements/WhoAreWeElement/dice.png" // Dice image for decoration*/}
          {/*  alt="Dice"*/}
          {/*  width={50}*/}
          {/*  height={50}*/}
          {/*  className="absolute bottom-0 right-5 z-10 w-1/4 max-sm:hidden sm:right-20"*/}
          {/*/>*/}
        </motion.div>

        {/* Card 4 - Bottom Left */}
        <motion.div
          className="col-span-1 row-span-2 flex items-center justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-2 sm:row-span-9 xl:col-span-2"
          initial={{ opacity: 0, y: 50 }} // Initial opacity and vertical position for animation
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original vertical position
          transition={{ delay: 1, duration: 0.8 }} // Delay and duration for the animation
        >
          <div
            className="relative flex h-full w-full items-center overflow-hidden rounded-xl"
            style={{
              backgroundImage: `url(${data.image_card5})`, // Dynamic background image from data
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            {/* Gradient overlay for the background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-customWhite-300/100 via-customWhite-300/100 to-customWhite-300/20 max-xl:bg-gradient-to-r" />

            {/* Content */}
            <div className="relative z-10 flex-col p-6">
              <h2 className="font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl">
                {data.information_title} {/* Dynamic title for information */}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: data.description_card_5 }} // Injecting HTML content for description
              />
            </div>
          </div>
        </motion.div>

        {/* Card 5 - Bottom Right */}
        <motion.div
          className="col-span-1 row-span-2 flex items-start justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-2 sm:row-span-6 xl:col-span-2"
          initial={{ opacity: 0, y: -50 }} // Initial opacity and vertical position for animation
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original vertical position
          transition={{ delay: 1.2, duration: 0.8 }} // Delay and duration for the animation
        >
          <div className="flex flex-col p-6">
            <h2 className="font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl">
              {data.our_services_title} {/* Dynamic title for services */}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: data.description_card_3 }} // Injecting HTML content for description
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
