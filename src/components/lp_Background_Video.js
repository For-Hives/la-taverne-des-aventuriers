// client side
"use client";

// Imports
import React, { useEffect, useRef } from "react";
import Player from "@vimeo/player";

// Declare the Video manager
const BackgroundVideoLP = () => {
    const firstVideoRef = useRef(null);

    useEffect(() => {
        // Verify if Vimeo iframe exist
        if (!firstVideoRef.current) return;

        // assignment of the Iframe to a player (vimeo API)
        const firstPlayer = new Player(firstVideoRef.current);

        // Variables to set the loop time and Vimeo Video duration
        let videoDuration = 0;
        const loopStart = 4; // Last three seconds of the video

        // Listener for the event 'durationchange' to obtain the video duration
        firstPlayer.on("durationchange", (data) => {
            // Assigning the video duration time to a variable
            videoDuration = data.duration;
        });

        // Listener for the event 'ended' to begin the loop right after the video ended
        firstPlayer.on("ended", () => {
            // Come back to the ... last seconds of the video to begin a loop
            firstPlayer.setCurrentTime(videoDuration - loopStart);
            firstPlayer.play(); // Begin the loop
        });

        // Cleaning
        return () => {
            firstPlayer.destroy().catch((error) => console.error("Error Destruction of the player", error));
        };
    }, []);

    return (
        // Video Div
        <div className="relative w-screen h-screen">

            {/*Vimeo Iframe*/}
            <iframe
                // indicating the video
                ref={firstVideoRef}
                // Styles
                className="mask-custom absolute left-0 top-0 object-cover object-center mix-difference animate-video -z-10 block bg-slate-900 opacity-75"
                // Url + set Video to Background, allow autoplay and disable the full video loop
                src="https://player.vimeo.com/video/1047422333?h=3ee0913fe6&background=1&autoplay=1&loop=0"
                // title
                title="Animation_Carte_1"
                // Dimensions of the Frame
                width="1920"
                height="1080"
                // Allowing Fullscreen mode
                allowFullScreen
            ></iframe>
        </div>
    );
};

// export
export default BackgroundVideoLP;
