'use client'
import React, { useReducer, useState } from "react";
import Table from "./Table";
import Button from "./Button";
import Modal from "./Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import error from '../../public/icons/error.png'
import useHttpRequest from "@/helpers/useHttpRequest";

interface User {
  _id: number;
  name: string;
  email: string;
  isAdmin: string;
}
interface UserForm {
  name: string;
  email: string;
  isAdmin: string;
}

type State = {
  users: User[];
};

type Action =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      const updatedUsers = state.users.map(user =>
        user._id === action.payload._id ? action.payload : user
      );
      return { ...state, users: updatedUsers };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter(user => user._id !== action.payload) };
    default:
      return state;
  }
};

interface ClientWrapperProps {
  users: User[];
}

interface FormInput {
  name: string;
  email: string;

  isAdmin: string;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userState, dispatch] = useReducer(reducer, { users });
  // const [loading, setLoading] = useState(false)
  const [plus, setPlus] = useState(true)
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const [editMode, setEditMode] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false)
  const [deleteid, setDeleteid] = useState<number>()
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const isAdmin: string[] = ["1", "2", "3"]
  const { makeRequest, loading } = useHttpRequest(); 


  const onEdit = (user: User) => {
    setEditedUser(user);
    setEditMode(true);
    reset({ name: user.name, email: user.email, isAdmin: user.isAdmin });
    toggleModal();
  };



  const onSubmit: SubmitHandler<UserForm> = async (data: UserForm) => {
    if (editMode) {
   
      const updatedUser: User = { ...editedUser!, ...data };


      const requestConfig = {
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/user`,
        data: updatedUser,
      };

      const successMessage = "User Updated successfully";

      const success = await makeRequest(requestConfig, successMessage);
      if (success) {
        updateUser(updatedUser);
        setEditMode(false);
        toggleModal();
        reset();
      }

    } else {
      setPlus(false);
    
      const responseData = data;
      const newUser: User = { ...responseData, _id: userState.users.length * 343434478787879 };

  
      const requestConfig = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/user`,
        data: responseData,
      };

      const successMessage = "User added successfullys";

      const success = await makeRequest(requestConfig, successMessage);
      if (success) {
        dispatch({ type: 'ADD_USER', payload: newUser });
        setPlus(true);
        toggleModal();
        reset();
      }
    }
  };


  const updateUser = (updatedUser: User) => {
    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
  };

  const onDelete = (userid: number) => {
    setDeleteModal(true)
    setDeleteid(userid)
    toggleModal()

  };


  const deleteUser = async () => {
    const requestConfig = {
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/user/${deleteid}`,
    };
    const successMessage = "User Delete successfully";

    const success = await makeRequest(requestConfig, successMessage);

    if (success) {
      dispatch({ type: 'DELETE_USER', payload: deleteid as number });
      toggleModal();
      reset();
    }



  };


  const cleardatas = () => {
    setEditMode(false)
    reset({ name: "", email: "", isAdmin: "" });

  }


  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };





  return (
    <div>
      <div>
        <Button onClick={toggleModal} plus={true}>Add user</Button>
        <Modal clear={cleardatas} isOpen={isModalOpen} toggleModal={toggleModal}>
          {deletemodal === false ? (<> <h2 className="text-center font-bold text-xl">{!editMode ? "Add User" : "Update User"}</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-2 flex flex-col space-y-2"
            >
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="John doe"
                  className="input input-bordered w-full max-w-sm"
                  defaultValue={editedUser?.name ?? ""}
                />
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@gmail.com"
                  className="input input-bordered w-full max-w-sm"
                  defaultValue={editedUser?.email ?? ""}
                />
              </div>

              <div className="form-control w-full max-w-sm">
                <label className="label">
                  <span className="label-text">User role</span>
                </label>
                <select className="select select-bordered" {...register("isAdmin")}>
                  <option value="" disabled>
                    Set Role
                  </option>
                  {isAdmin.map((name) => (
                    <option key={name} value={name} selected={editedUser?.isAdmin === name}>
                      {name === "1"
                        ? "USER"
                        : name === "2"
                          ? "ADMIN"
                          : name === "3"
                            ? "INSTRUCTOR"
                            : name}
                    </option>
                  ))}
                </select>
              </div>




              <Button disabled={!loading} loading={loading} plus={plus && !editMode}>{(!editMode && loading)
                ? "Adding User"
                : (editMode && loading)
                  ? "Updating User"
                  : (editMode)
                    ? "Edit User"
                    : "Add User"}</Button>
            </form></>) : (<>
              <Image alt="error" src={error} className="mx-auto mb-4" width={48} height={48} />
              <h2 className="text-center font-semibold">Are you sure you want to to delete the selected user</h2>

              <div className="flex items-center justify-center mt-6 gap-4"><Button onClick={() => {
                toggleModal()
                setDeleteModal(false)
              }}>Cancel</Button>
                <Button disabled={!loading} onClick={deleteUser} loading={loading} error={true}>{loading ? "Deleting User" : "Delete User"} </Button></div>
            </>)}
        </Modal>
        <div className="mt-8"></div>
        <Table
          users={userState.users}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default ClientWrapper;