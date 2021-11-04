import React from "react";

const VideoEmbed = ({ url }) => {
  return (
  <div className="flex my-2 w-10/12 md:w-4/5 xl:max-w-screen-lg mx-auto">
    <div className="w-full mx-auto aspect-w-16 aspect-h-9">
      <video
        className="flex-grow"
        src={`${url}&autoplay=1&loop=1`}
        frameBorder="0"
        autoPlay
        controls
        allowFullScreen
        title="Video"
      />
    </div>
  </div>)
};

export default VideoEmbed;