'use client'
import React, { useReducer, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import error from '/public/icons/error.png'
import InstructorTable from "./InstructorTable";
import axios from "axios";
import { Data } from "../context/DataProvider";


interface Course {
    _id?: number;
    title: string;
    description: string;
    image?: string | undefined;
}

interface UserForm {
    title: string;
    description: string;

}

interface FormInput {
    title: string;
    description: string;

}
interface ClientWrapperProps {
    courses: Course[];
}


type State = {
    courses: Course[];
};

type Action =
    | { type: 'ADD_USER'; payload: Course }
    | { type: 'UPDATE_USER'; payload: Course }
    | { type: 'DELETE_USER'; payload: number | undefined };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_USER':
            return { ...state, courses: [...state.courses, action.payload] };
        case 'UPDATE_USER':

            const updatedUsers = state.courses.map(course =>
                course._id === action.payload._id ? action.payload : course
            );
            return { ...state, courses: updatedUsers };
        case 'DELETE_USER':
            return { ...state, courses: state.courses.filter(course => course._id !== action.payload) };
        default:
            return state;
    }
};




const InstructorWrapper: React.FC<ClientWrapperProps> = ({ courses }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userState, dispatch] = useReducer(reducer, { courses });
    const [loading, setLoading] = useState(false)
    const [plus, setPlus] = useState(true)
    const { register, handleSubmit, reset } = useForm<FormInput>();
    const [editMode, setEditMode] = useState(false);
    const [deletemodal, setDeleteModal] = useState(false)
    const [deleteid, setDeleteId] = useState<number | undefined>()
    const [editedCourse, setEditedCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState<any | null>()
    const [selectedImageFile, setSelectedImageFile] = useState<File | undefined>(undefined);
    const [editImageFile, setEditImageFile] = useState<string | undefined>(undefined);
    // const {makeRequest,loading, resp} = useHttpRequest()
    const { data } = Data()


    const role: string[] = ["USER", "ADMIN", "INSTRUCTOR"]

    const createImageFormData = (imageFile: File) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append("upload_preset", "uploads");
        return formData;
    };



    const onEdit = (course: Course) => {
        setSelectedImageFile(undefined)
        setEditedCourse(course);
        setEditMode(true);
        reset({ title: course.title, description: course.description });
        setEditImageFile(course.image)
        toggleModal();
    };



    const onSubmit: SubmitHandler<UserForm> = async (datas: UserForm) => {

        if (editMode) {
            setLoading(true);
            if (selectedImageFile) {
                try {
                    const res: any = await axios.post("https://api.cloudinary.com/v1_1/destiny1233/image/upload",formData)
                    if (res.status === 200) {
                        const { url } = res.data
                        toast.success("Image uploaded successfully")

                        const secondresponse = await axios.put(`${process.env.BASE_URL}/api/course`, { ...editedCourse!, image: url, ...datas });
                        if (secondresponse.status === 200) {
                            const updatedUser: Course = { ...editedCourse!, image: url, ...datas };
                            updateCourse(updatedUser);
                            setEditMode(false);
                            setLoading(false);
                            toggleModal();
                            reset()
                            toast.success("Course Updated successfully")
                        }

                    }
                } catch (error: any) {
                    console.log(error)
                    setLoading(false);
                    toast.error(error.response.data.message);

                }

            } else {
                try {
                    const secondresponse = await axios.put(`${process.env.BASE_URL}/api/course`, { ...editedCourse, ...datas });
                    if (secondresponse.status === 200) {
                        const updatedUser: Course = { ...editedCourse, ...datas };
                        updateCourse(updatedUser);
                        setEditMode(false);
                        toggleModal();
                        reset()
                        toast.success("Course Updated successfully")
                    }

                } catch (error: any) {
                    console.log(error)
                    setLoading(false);
                    toast.error(error.response.data.message);

                }
            }




        } else {
            setPlus(false);
            setLoading(true)
            try {
                const response: any = await axios.post("https://api.cloudinary.com/v1_1/destiny1233/image/upload", formData);
                if (response.status === 200) {
                    toast.success("Image uploaded successfully");

                    const { url } = response.data;

                    const secondresponse = await axios.post(`${process.env.BASE_URL}/api/course`, { ...datas, image: url, userId: data?._id });
                    if (secondresponse.status === 200) {
                        const newUser: Course = { ...datas, image: url, _id: userState.courses.length + 1 };
                        dispatch({ type: 'ADD_USER', payload: newUser });
                        setPlus(true);
                        setLoading(false);
                        toggleModal();
                        reset();
                        toast.success("Course added successfully");
                    }

                }
            } catch (error: any) {
                setLoading(false)
                toast.error(error.response.data.error);
            }



        }
    };


    const updateCourse = (updatedCourse: Course) => {
        dispatch({ type: 'UPDATE_USER', payload: updatedCourse });
    };

    const onDelete = (courseId: number) => {
        console.log(courseId)
        setDeleteModal(true)
        setDeleteId(courseId)
        toggleModal()

    };


    const deleteUser = async () => {
        setLoading(true);

        try {
            const res: any = await axios.delete(`${process.env.BASE_URL}/api/course/${deleteid}`)
            if (res.status === 200) {
                dispatch({ type: 'DELETE_USER', payload: deleteid });
                toggleModal();
                reset();
                setLoading(false)
                toast.success("Course Delete successfully")
                setDeleteModal(false)
            }

        } catch (error: any) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.error);
        }



    };

    const cleardatas = () => {
        setEditMode(false)
        reset({ title: "", description: "" });
        setEditImageFile(undefined)
        setSelectedImageFile(undefined)
    }

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };


    return (
        <div>
            <div>
                <Button onClick={toggleModal} plus={true}>Add Course</Button>

                <Modal clear={cleardatas} isOpen={isModalOpen} toggleModal={toggleModal}>
                    {deletemodal === false ? (<> <h2 className="text-center font-bold text-xl">{!editMode ? "Add Course" : "Update Course"}</h2>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-2 flex flex-col space-y-4"
                        >
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    {...register("title")}
                                    type="text"
                                    placeholder="course title"
                                    className="input input-bordered w-full max-w-sm"
                                    defaultValue={editedCourse?.title ?? ""}
                                />
                            </div>

                            <div className="flex items-end">
                                <div className="form-control w-9/12 ">
                                    <label className="label">
                                        <span className="label-text">Image</span>
                                    </label>

                                    <input onChange={(e) => {
                                        const selectedFile = e.target.files && e.target.files[0];
                                        if (selectedFile && selectedFile.type.startsWith("image/")) {
                                            const imageFormData = createImageFormData(selectedFile);
                                            setEditImageFile(undefined)
                                            setSelectedImageFile(selectedFile);
                                            setFormData(imageFormData)
                                        } else {
                                            // Invalid file type
                                            // You can display an error message to the user
                                            console.log("Invalid file type. Please select an image.");
                                        }
                                    }} type="file" className="file-input w-full max-w-xs" defaultValue={editedCourse?.image ?? ""} />
                                </div>

                                <div className="w-3/12 mt-4">
                                    {(editImageFile && !selectedImageFile) && (

                                        <Image
                                            src={editImageFile}
                                            alt="Selected"
                                            width={80}
                                            height={30}
                                        />

                                    )}
                                    {(selectedImageFile && !editImageFile) && (

                                        <Image
                                            src={URL.createObjectURL(selectedImageFile)}
                                            alt="Selected"
                                            width={80}
                                            height={30}
                                        />

                                    )}
                                </div>
                            </div>


                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea {...register("description")} placeholder="Course description" className="textarea textarea-bordered textarea-lg w-full max-w-sm" defaultValue={editedCourse?.description ?? ""} ></textarea>
                            </div>







                            <Button disabled={!loading} loading={loading} plus={plus && !editMode}>{(!editMode && loading)
                                ? "Adding Course"
                                : (editMode && loading)
                                    ? "Updating Course"
                                    : (editMode)
                                        ? "Edit Course"
                                        : "Add Course"}</Button>
                        </form></>) : (<>
                            <Image alt="error" src={error} className="mx-auto mb-4" width={48} height={48} />
                            <h2 className="text-center font-semibold">Are you sure you want to to delete the selected Course</h2>

                            <div className="flex items-center justify-center mt-6 gap-4"><Button onClick={() => {
                                toggleModal()
                                setDeleteModal(false)
                            }}>Cancel</Button>
                                <Button disabled={!loading} onClick={deleteUser} loading={loading} error={true}>{loading ? "Deleting Course" : "Delete Course"} </Button></div>
                        </>)}
                </Modal>
                <div className="mt-8"></div>
                <InstructorTable
                    course={userState.courses}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </div>
    );
};

export default InstructorWrapper;