import React from "react";

const VideoEmbed = ({ url }) => {
  return (
  <div className="flex my-2 w-10/12 md:w-4/5 xl:max-w-screen-lg mx-auto">
    <div className="w-full mx-auto aspect-w-16 aspect-h-9">
      <iframe
        className="flex-grow"
        src={`${url}&autoplay=1&loop=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  </div>)
};

export default VideoEmbed;