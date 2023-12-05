"use client"
import React, { useState } from 'react';
import Button from './Button';
import useHttpRequest from '@/helpers/useHttpRequest';
import { useRouter } from "next/navigation";

interface ButtonProps {
    hasValues: boolean;
    courseId: { userId: string, courseId: string }
    display: boolean
}

function CourseButton({ hasValues, courseId, display }: ButtonProps) {
    const router = useRouter();
    const [show, setShow] = useState<boolean | undefined>(display);

    const { makeRequest, loading } = useHttpRequest();

    const enroll = async () => {
        const requestConfig = {
            method: 'post',
            url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/enroll`,
            data: courseId
        };

        const successMessage = "Course enrolled successfully";

        const success = await makeRequest(requestConfig, successMessage);
        if (success) {
            setShow(true)
        }


    }
    return (
        <>
            {
                show !== true ? (
                    <Button
                        disabled={!hasValues}
                        onClick={enroll}
                        loading={loading}
                    >
                        {hasValues ? "Enrolled" : "Enroll"}
                    </Button>
                ) : (
                    <Button disabled={false}>Enrolled</Button>
                )
            }

        </>

    );
}

export default CourseButton;
