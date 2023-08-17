import React from 'react'


interface VideoComponentProps {
    videoUrl: string | undefined;
}

const Vedio = ({ videoUrl }: VideoComponentProps) => {
  return (

      <div className="video-container">
          <video controls className="w-full">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
      </div>

  )
}

export default Vedio
