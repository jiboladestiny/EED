import React, { useEffect, useState } from 'react';

interface VideoComponentProps {
    videoUrl: string | undefined;
}

const Vedio = ({ videoUrl }: VideoComponentProps) => {
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>(videoUrl);

    useEffect(() => {
        setCurrentVideoUrl(videoUrl);
    }, [videoUrl]);

    return (
        <div className="video-container">
            <video controls className="w-full">
                <source src={currentVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Vedio;
