"use client"
import React, { useState } from 'react';

const Progress = () => {
    const [progress, setProgress] = useState<number>(0);

    const updateProgressBar = (percent: number) => {
        setProgress(percent);
    };

    const fetchData = async () => {
        try {
            const response: any = await fetch('https://jsonplaceholder.typicode.com/photos');

            if (response.ok) {
                console.log(...response.headers)
            } else{
                throw new Error('Network response was not ok');
            }

            // const reader = response.body!.getReader();

            // let receivedBytes = 0;
            // let totalBytes = +response.headers.get('Content-Length')!;
         
            // while (true) {
            //     const { done, value } = await reader.read();

            //     if (done) {
            //         break;
            //     }
  
            //     receivedBytes += value.length;
            //     const percentComplete = (receivedBytes / totalBytes) * 100;
          
            //     updateProgressBar(percentComplete);
            // }

            // console.log(response);

            // You've already read and processed the response data using the reader.
            // If you need to perform additional processing, do it here.
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <div className="progress">
                {/* Inline style to update progress bar width */}
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <button onClick={fetchData}>Fetch Data</button>
        </div>
    );
};

export default Progress;
