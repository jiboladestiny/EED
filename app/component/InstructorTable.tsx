import Link from "next/link";
import React from "react";
// Define the user type
interface Course {
    title: string;
    description: string;
    image?: string | undefined;
    _id?: number | undefined;
}

interface TableProps {
    course: Course[];
    onEdit: (course: Course) => void;   // Prop for editing user
    onDelete: (courseId: number) => void; // Prop for deleting user
}

const InstructorTable: React.FC<TableProps> = ({ course, onEdit, onDelete }) => {
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
                                Title
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-5">
                                <span className="sr-only">Content</span>
                            </th>
                            <th scope="col" className="px-6 py-5">
                                <span className="sr-only">Assestment</span>
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
                        {course.map((data) => (
                            <tr
                                key={data._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data._id}
                                </td>
                                <td className="px-6 py-5">{data.title}</td>
                                <td className="px-6 py-5">{data.description}...</td>
                                <td className="px-6 py-5">
                                    <Link href={`/instructor/quiz/${data._id}`}>   <button

                                        className="font-medium text-green-600 dark:text-green-500 hover:underline"
                                    >
                                        Assestment
                                    </button>{" "}
                                    </Link>
                                </td>
                                <td className="px-6 py-5">
                                    <Link href={`/instructor/${data._id}`}>   <button

                                        className="font-medium text-green-600 dark:text-green-500 hover:underline"
                                    >
                                        Content
                                    </button>{" "}
                                    </Link>
                                </td>
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
                                            if (data._id !== undefined) {
                                                onDelete(data._id); // Trigger onDelete function with the user ID
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

export default InstructorTable;
