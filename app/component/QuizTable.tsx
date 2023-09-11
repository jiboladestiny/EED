"use client"
import React, { useEffect, useState } from "react";
// Define the user type
interface Quiz {
    id?: number | undefined;
    courseId?: number | undefined;
    question: string;
    options?: string[] | undefined;
    correctAnswer: string;
}
interface TableProps {
    quiz: Quiz[];
    onEdit: (data: Quiz) => void;   // Prop for editing user
    onDelete: (quizId: number) => void; // Prop for deleting user
}

const QuizTable: React.FC<TableProps> = ({ quiz, onEdit, onDelete }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-5">
                                id
                            </th>
                            <th scope="col" className="px-6 py-5">
                                question
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Options
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Correct Answer
                            </th>

                            <th scope="col" className="px-6 py-5">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="px-6 py-5">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {quiz.map((data) => (
                            <tr
                                key={data.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.id}
                                </td>
                                <td className="px-6 py-5">{data.question}</td>
                                <td className="px-6 py-5 flex flex-row gap-x-2">{data.options?.map((item)=>{
                                    return (<span className="bg-gray-600 text-white p-2 text-[12px] rounded-lg" key={item}>{item.substring(0,30)}</span>)
                                })}</td>
                                <td className="px-6 py-5">{data.correctAnswer}</td>
                              
                                <td className="px-6 py-5">
                                    <button

                                        onClick={() => onEdit(data)} // Trigger onEdit function with the user data
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>{" "}

                                </td>
                                <td className="px-6 py-5">
                                    {/* Add a Delete button */}
                                    <button
                                        onClick={() => {
                                            if (data.id !== undefined) {
                                                onDelete(data.id); // Trigger onDelete function with the user ID
                                            }
                                        }}
                                        className="ml-2 font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuizTable;
