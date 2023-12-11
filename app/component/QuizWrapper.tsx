"use client"
import React, { useReducer, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import QuizTable from './QuizTable';
import Button from './Button';
import Modal from './Modal';
import Image from 'next/image';
import error from '../../public/icons/error.png'
import useHttpRequest from '@/helpers/useHttpRequest';
import toast from 'react-hot-toast';
import axios from 'axios';



interface Quiz {
    _id?: number | undefined;
    courseId?: string | undefined;
    question: string;
    options?: string[] | undefined;
    correctAnswer: string;
}


interface FormInput {
    question: string;
    correctAnswer: string;
}


interface QuizProps {
    quiz: Quiz[];
    course: string | undefined
}


type State = {
    quiz: Quiz[];
};

type Action =
    | { type: 'ADD_USER'; payload: Quiz }
    | { type: 'UPDATE_USER'; payload: Quiz }
    | { type: 'DELETE_USER'; payload: number | undefined };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_USER':
            return { ...state, quiz: [...state.quiz, action.payload] };
        case 'UPDATE_USER':

            const updatedUsers = state.quiz.map(course =>
                course._id === action.payload._id ? action.payload : course
            );
            return { ...state, quiz: updatedUsers };
        case 'DELETE_USER':
            return { ...state, quiz: state.quiz.filter(course => course._id !== action.payload) };
        default:
            return state;
    }
};



const QuizWrapper = ({ quiz, course }: QuizProps) => {
    const [userState, dispatch] = useReducer(reducer, { quiz });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plus, setPlus] = useState(true)
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm<FormInput>();
    const [editMode, setEditMode] = useState(false);
    const [deletemodal, setDeleteModal] = useState(false)
    const [deleteid, setDeleteId] = useState<number | undefined>()
    const [editedQuiz, setEditedQuiz] = useState<Quiz | null>(null);

    const [options, setOptions] = useState<string[]>([]);
    const [optionValue, setOptionValue] = useState<string>("");
    const isOptionInputDisabled = options.length >= 4;
    // const { makeRequest, loading, res } = useHttpRequest();




    const onEdit = (quiz: Quiz) => {
        setDeleteModal(false)
        setEditedQuiz(quiz);
        setOptions(quiz.options || []);
        setEditMode(true);
        reset({ question: quiz.question, correctAnswer: quiz.correctAnswer });
        toggleModal();
    };



    const onDelete = (quizId: number) => {
        setDeleteModal(true)
        setDeleteId(quizId)
        toggleModal()
    };


    const deleteUser = async () => {
        // const requestConfig = {
        //     method: "delete",
        //     url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/quiz/${deleteid}`,
        // };
        // const successMessage = "Question Delete successfully";

        // const success = await makeRequest(requestConfig, successMessage);

        // if (success) {
        //     dispatch({ type: 'DELETE_USER', payload: deleteid });
        //     toggleModal();
        //     cleardatas()
        // }


        setLoading(true);
        try {
            const res: any = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/api/quiz/${deleteid}`)
            if (res.status === 200) {
                dispatch({ type: 'DELETE_USER', payload: deleteid });
                                setLoading(false);
                toggleModal();
                reset();
                toast.success("Content Delete successfully")
                setDeleteModal(false)
            }
        } catch (error: any) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.error);
        }



    };

    const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {
        // setLoading(true);
        if (editMode) {
            const updatedQuiz: Quiz = {
                ...editedQuiz,
                question: data.question,
                correctAnswer: data.correctAnswer,
                options: options.filter((option) => option.trim() !== ""),
            };

            // const requestConfig = {
            //     method: 'put',
            //     url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/quiz`,
            //     data: updatedQuiz,
            // };
            // const successMessage = "Question Updated successfully";
            // const success = await makeRequest(requestConfig, successMessage);
            // if (success) {
            //     dispatch({ type: 'UPDATE_USER', payload: updatedQuiz });
            //     toggleModal();
            //     cleardatas()
            // }

            setLoading(true);
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN}/api/quiz`, updatedQuiz);
                if (response.status === 200) {
                    toast.success("Question added succesfully")
                    // console.log(response.data.savedQuiz._id);
                    dispatch({ type: 'UPDATE_USER', payload: updatedQuiz });
                    // setPlus(true);
                    setLoading(false)
                    cleardatas()
                    toggleModal();
                }

            } catch (error: any) {
                setLoading(false)
                toast.error(error.response.data.error);
            }


        } else {
            setPlus(false)
            setLoading(true);

            const quizData: Quiz = {
                courseId: course,
                question: data.question,
                correctAnswer: data.correctAnswer,
                options: options.filter((option) => option.trim() !== ""),
            };


            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/quiz`, quizData);
                if (response.status === 200) {
                    toast.success("Question added succesfully")
                    // console.log(response.data.savedQuiz._id);
                    dispatch({ type: 'ADD_USER', payload: { ...quizData, _id: response.data.savedQuiz._id } });
                    setPlus(true);
                    setLoading(false)
                    cleardatas()
                    toggleModal();
                }

            } catch (error: any) {
                setLoading(false)
                toast.error(error.response.data.error);
            }

            // const requestConfig = {
            //     method: 'post',
            //     url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/quiz`,
            //     data: quizData,
            // };

            // const successMessage = "Question added successfullys";

            // const success = await makeRequest(requestConfig, successMessage);
            // if (success) {
            // console.log({ ...quizData, _id: res })

            // }



        }
    };



    const removeOption = (indexToRemove: number) => {
        const updatedOptions = [...options];
        updatedOptions.splice(indexToRemove, 1);
        setOptions(updatedOptions);
    };


    const cleardatas = () => {
        setEditMode(false)
        reset({ question: "", correctAnswer: "" });
        setOptions([])
    }


    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };


    return (
        <div>
            <Button onClick={toggleModal} plus={true}>Add Question</Button>
            <Modal isOpen={isModalOpen} clear={cleardatas} toggleModal={toggleModal}>
                {deletemodal ? (<>
                    <Image alt="error" src={error} className="mx-auto mb-4" width={48} height={48} />
                    <h2 className="text-center font-semibold">Are you sure you want to to delete the selected question</h2>
                    
                    <div className="flex items-center justify-center mt-6 gap-4">
                        <Button disabled={!loading} onClick={deleteUser} loading={loading} error={true}>{loading ? "Deleting Question" : "Delete Question"} </Button></div>
                </>) : (<>        <h2 className="text-center font-bold text-xl">{!editMode ? "Add Queston" : "Edit Question"}</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-2 flex flex-col space-y-4"
                    >
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Question</span>
                            </label>
                            <input
                                {...register("question")}
                                type="text"
                                placeholder="Question"
                                className="input input-bordered w-full max-w-sm"

                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Options</span>
                            </label>
                            <div className="flex">
                                <div className="w-[80%]">
                                    <input
                                        type="text"
                                        placeholder="Options"
                                        className="input input-bordered w-full"
                                        value={optionValue}
                                        disabled={isOptionInputDisabled}
                                        onChange={(e) => {

                                            setOptionValue(e.target.value)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && optionValue.trim() !== "") {
                                                // Add the option when Enter key is pressed and the input is not empty
                                                setOptions([...options, optionValue]);
                                                setOptionValue(""); // Clear the input field
                                            }
                                        }}
                                    />
                                </div>
                                <Button disabled={!isOptionInputDisabled} onClick={(e) => {
                                    e.preventDefault(); // Prevent form submission

                                    if (optionValue.trim() !== "") {
                                        setOptions([...options, optionValue]);
                                        setOptionValue(""); // Clear the input field
                                    }
                                }}>Add</Button>
                            </div>
                            {options.length > 0 && <div className='mt-4'>
                                {options?.map((item, index) => (
                                    <div key={item} className="flex items-center justify-between space-x-2 mr-4">
                                        <span className='text-[18px]'>{item}</span>
                                        <span className=" bg-red-500 cursor-pointer text-white w-[20px] h-[20px] rounded-full flex items-center justify-center"


                                            onClick={() => removeOption(index)}
                                        >
                                            x
                                        </span>
                                    </div>
                                ))}
                            </div>}
                        </div>




                        {options.length === 4 && <div className="form-control w-full max-w-sm">
                            <label className="label">
                                <span className="label-text">Correct Answer</span>
                            </label>
                            <select className="select select-bordered" {...register("correctAnswer")}>
                                <option value="" disabled>
                                    Select Answer
                                </option>
                                {options.map((name) => (
                                    <option key={name} value={name} selected={editedQuiz?.correctAnswer === name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        }




                        <Button disabled={!loading} loading={loading} plus={plus && !editMode}>{(!editMode && loading)
                            ? "Adding Question"
                            : (editMode && loading)
                                ? "Updating Question"
                                : (editMode)
                                    ? "Edit Question"
                                    : "Add Question"}</Button>
                    </form></>)}

            </Modal>
            <QuizTable quiz={userState.quiz} onEdit={onEdit} onDelete={onDelete} />
        </div>
    )
}

export default QuizWrapper
