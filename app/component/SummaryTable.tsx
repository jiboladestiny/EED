"use client"
import React, { useEffect, useState } from "react";
// Define the user type
interface Summary {
    _id?: number | undefined; courseId?: string | undefined; outline: string; vedio?: string | undefined; description: string;
}
interface TableProps {
    summary: Summary[];
    onEdit: (data: Summary) => void;   // Prop for editing user
    onDelete: (summaryId: number) => void; // Prop for deleting user
    onShowVedio: (vedio: string | undefined) => void; // Prop for showing vedio modal
}

const SummaryTable: React.FC<TableProps> = ({ summary, onEdit, onDelete, onShowVedio }) => {

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
                                Outline
                            </th>
                            <th scope="col" className="px-6 py-5">
                                Summary
                            </th>

                            <th scope="col" className="px-6 py-5">
                                <span className="sr-only">show vedio</span>
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
                        {summary.map((data) => (
                            <tr
                                key={data._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data._id}
                                </td>
                                <td className="px-6 py-5">{data.outline}</td>
                                <td className="px-6 py-5 md:w-auto">{
                                data.description.substring(0, 30)}
                              </td>
                                <td className="px-6 py-5">
                                    <button

                                        onClick={() => onShowVedio(data.vedio)} // Trigger onEdit function with the user data
                                        className="font-medium text-green-600 dark:text-green-500 hover:underline"
                                    >
                                        show vedio
                                    </button>{" "}

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

export default SummaryTable;
