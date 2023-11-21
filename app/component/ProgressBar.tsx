import React from 'react';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const roundedProgress = Math.round(progress); // Round the progress to the nearest whole number

    return (
        <div className="absolute w-full left-0 bottom-0">

            <div className="w-full bg-gray-200 rounded-full">
                <div
                    className="bg-green-500 rounded-full text-xs leading-none py-[2px] text-center text-white"
                    style={{ width: `${roundedProgress}%` }}
                >
                    {roundedProgress > 0 && roundedProgress < 100 && `${roundedProgress}%`}
                </div>
            </div>

        </div>
    );
};

export default ProgressBar;
