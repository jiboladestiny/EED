"use client"
import React, { useReducer, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Button from './Button';
import Modal from './Modal';
import error from '../../public/icons/error.png'
import Image from 'next/image';
import SummaryTable from './SummaryTable';
import Vedio from './Vedio';

interface Summary {
  id?: number | undefined;
  courseId?: number | undefined;
  outline: string;
  vedio?: string | undefined;
  description: string;
}

interface FormInput {
  outline: string;
  description: string;

}


interface SummaryProps {
  summary: Summary[];
}


type State = {
  summary: Summary[];
};

type Action =
  | { type: 'ADD_USER'; payload: Summary }
  | { type: 'UPDATE_USER'; payload: Summary }
  | { type: 'DELETE_USER'; payload: number | undefined };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, summary: [...state.summary, action.payload] };
    case 'UPDATE_USER':

      const updatedUsers = state.summary.map(course =>
        course.id === action.payload.id ? action.payload : course
      );
      return { ...state, summary: updatedUsers };
    case 'DELETE_USER':
      return { ...state, summary: state.summary.filter(course => course.id !== action.payload) };
    default:
      return state;
  }
};


const SummaryWrapper = ({ summary }: SummaryProps) => {
  const [userState, dispatch] = useReducer(reducer, { summary });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plus, setPlus] = useState(true)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const [editMode, setEditMode] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false)
  const [showVedioModal, setShowVedioModal] = useState(false)
  const [deleteid, setDeleteId] = useState<number | undefined>()
  const [editedCourse, setEditedCourse] = useState<Summary | null>(null);
  const [formData, setFormData] = useState<any | null>()
  const [selectedImageFile, setSelectedImageFile] = useState<File | undefined>(undefined);
  const [editImageFile, setEditImageFile] = useState<string | undefined>(undefined);
  const maxFileSize = 10 * 1024 * 1024; // 10 MB in bytes

  const createImageFormData = (imageFile: File) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append("upload_preset", "uploads");
    return formData;
  };


  const onEdit = (data: Summary) => {
    // setSelectedImageFile(undefined)
    // console.log(course)
    setDeleteModal(false)
    setShowVedioModal(false)
    setEditedCourse(data);
    setEditMode(true);
    reset({});
    // setEditImageFile(data.vedio)
    toggleModal();
  };


  const updateCourse = (updatedCourse: Summary) => {
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
    setTimeout(() => {
      dispatch({ type: 'DELETE_USER', payload: deleteid });
      setLoading(false);
      toggleModal();
      reset();
      toast.success("Content Delete successfully")
    }, 2000)

  };

  const showVedio = (vedio: string | undefined) => {
    toggleModal()
    setShowVedioModal(true)
    setEditImageFile(vedio)
  }

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
    setEditImageFile(undefined)
  };






  const onSubmit: SubmitHandler<FormInput> = async (data: FormInput) => {

    if (editMode) {
      setLoading(true);
      if (selectedImageFile) {
        try {
          const response = await fetch("https://api.cloudinary.com/v1_1/destiny1233/image/upload", {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const res = await response.json();
            const { url } = res
            const updatedUser: Summary = { ...editedCourse!, vedio: url, ...data };
            updateCourse(updatedUser);
            setEditMode(false);
            setLoading(false);
            toggleModal();
            reset()
            toast.success("Content Updated successfully")
          } else {
            throw new Error('Image upload failed');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          return undefined;
        }

      } else {
        const updatedUser: Summary = { ...editedCourse, ...data };
        setTimeout(() => {
          updateCourse(updatedUser);
          setEditMode(false);
          setLoading(false);
          toggleModal();
          reset()
          toast.success("Content Updated successfully")

        }, 2000);
      }

    } else {
      setPlus(false);
      setLoading(true);


      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/destiny1233/image/upload", {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const res = await response.json();
          const { url } = res
          
          // const newUser: Summary = { ...data, vedio: url, id: userState.summary.length + 1 };

          // dispatch({ type: 'ADD_USER', payload: newUser });
          // setPlus(true);
          // setLoading(false);
          // toggleModal();
          // reset();
          toast.success("Content added successfully")
        } else {
          throw new Error('Vedio upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return undefined;
      }
    }
  };



  return (
    <div>

      <Button onClick={toggleModal} plus={true}>Add Content</Button>

      <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        {deletemodal  ? 
          (<>
            <Image alt="error" src={error} className="mx-auto mb-4" width={48} height={48} />
            <h2 className="text-center font-semibold">Are you sure you want to to delete the selected Content</h2>

            <div className="flex items-center justify-center mt-6 gap-4"><Button onClick={() => {
              toggleModal()
              setDeleteModal(false)
            }}>Cancel</Button>
              <Button disabled={!loading} onClick={deleteUser} loading={loading} error={true}>{loading ? "Deleting Content" : "Delete Content"} </Button></div>
          </>) : (showVedioModal) ? (
            <div className='p-[0.8rem]'> <Vedio videoUrl={editImageFile} /></div>

          ) : (<>
              <h2 className="text-center font-bold text-xl">{!editMode ? "Add Content" : "Update Content"}</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-2 flex flex-col space-y-4"
              >
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("description")}
                    type="text"
                    placeholder="course title"
                    className="input input-bordered w-full"
                    defaultValue={editedCourse?.outline ?? ""}
                  />
                </div>

                <div className="">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Image</span>
                    </label>

                    <input onChange={(e) => {
                      const selectedFile = e.target.files && e.target.files[0];
                      if (selectedFile && selectedFile.type.startsWith("video/")) {
                        if (selectedFile.size <= maxFileSize) {
                          const imageFormData = createImageFormData(selectedFile);
                          setEditImageFile(undefined)
                          setSelectedImageFile(selectedFile);
                          setFormData(imageFormData)
                        } else {

                          toast.error("File size exceeds the maximum limit (10MB).")

                        }
                      } else {

                        toast.error("Invalid file type. Please select a vedio file.")

                      }
                    }} type="file" className="file-input w-full" />
                  </div>

                  {/* <div className="">
                {(editImageFile) && (

                  <Vedio videoUrl={editImageFile} />

                )}
                {(selectedImageFile) && (

                  <Vedio videoUrl={URL.createObjectURL(selectedImageFile)} />

                )}
              </div> */}
                </div>


                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea {...register("description")} placeholder="Course description" className="textarea textarea-bordered textarea-lg w-full" defaultValue={editedCourse?.description ?? ""} ></textarea>
                </div>







                <Button disabled={!loading} loading={loading} plus={plus && !editMode}>{(!editMode && loading)
                  ? "Adding Content"
                  : (editMode && loading)
                    ? "Updating Content"
                    : (editMode)
                      ? "Edit Content"
                      : "Add Content"}</Button>
              </form></>) }
      </Modal>
      <div className="mt-8"></div>

      <SummaryTable
        summary={userState.summary}
        onEdit={onEdit}
        onDelete={onDelete}
        onShowVedio={showVedio}
      />



    </div>
  )
}

export default SummaryWrapper
