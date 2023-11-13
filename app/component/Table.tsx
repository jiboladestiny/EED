import React from "react";
// Define the user type
interface User {
  _id: number;
  name: string;
  email: string;
  isAdmin: string;
}

interface TableProps {
  users: User[];
  onEdit: (user: User) => void;  
  onDelete: (userId: number) => void; 
}

const Table: React.FC<TableProps> = ({ users, onEdit, onDelete }) => {
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
                Name
              </th>
              <th scope="col" className="px-6 py-5">
                Email
              </th>
              <th scope="col" className="px-6 py-5">
                Role
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
            {users.map((data) => (
              <tr
                key={data._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {data._id}
                </td>
                <td className="px-6 py-5">{data.name}</td>
                <td className="px-6 py-5">{data.email}</td>
                <td className="px-6 py-5">{data.isAdmin == "1"
                  ? "USER"
                  : data.isAdmin == "2"
                    ? "ADMIN"
                    : data.isAdmin == "3"
                      ? "INSTRUCTOR"
                      : data.isAdmin}</td>
                <td className="px-6 py-5">
                  <a
                    href="#"
                    onClick={() => onEdit(data)} // Trigger onEdit function with the user data
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>{" "}
       
                </td>
                <td className="px-6 py-5">
                  {/* Add a Delete button */}
                  <button
                    onClick={() => onDelete(data._id)} // Trigger onDelete function with the user ID
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

export default Table;
