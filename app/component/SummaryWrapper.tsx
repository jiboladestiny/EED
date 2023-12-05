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
import axios from 'axios';
import ProgressBar from './ProgressBar';

interface Summary {
  _id?: number | undefined;
  courseId?: string | undefined;
  outline: string;
  url?: string | undefined;
  description: string;
}

interface SummaryWrapperProps {
  summary: Summary[];
  summaryid: string;
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
        course._id === action.payload._id ? action.payload : course
      );
      return { ...state, summary: updatedUsers };
    case 'DELETE_USER':
      return { ...state, summary: state.summary.filter(course => course._id !== action.payload) };
    default:
      return state;
  }
};


const SummaryWrapper = ({ summary, summaryid }: SummaryWrapperProps) => {
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
  const maxFileSize = 50 * 1024 * 1024; // 10 MB in bytes
  const [progress, setProgress] = useState(0);

  const createImageFormData = (imageFile: File) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append("upload_preset", "uploads");
    return formData;
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



  const onEdit = (data: Summary) => {
    setDeleteModal(false)
    setShowVedioModal(false)
    setEditedCourse(data);
    setEditMode(true);
    reset({ outline: data.outline, description: data.description });
    toggleModal();
  };


  const updateCourse = (updatedCourse: Summary) => {
    dispatch({ type: 'UPDATE_USER', payload: updatedCourse });
  };



  const onDelete = (courseId: number) => {
    setDeleteModal(true)
    setDeleteId(courseId)
    toggleModal()

  };


  const deleteUser = async () => {
    setLoading(true);
    try {
      const res: any = await axios.delete(`${process.env.NEXT_PUBLIC_DOMAIN}/api/summary/${deleteid}`)
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

    if (editMode) {
      setLoading(true);
      if (selectedImageFile) {
        try {
          const response = await axios.post("https://api.cloudinary.com/v1_1/destiny1233/video/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent: any) => {
              const progress = (progressEvent.loaded / progressEvent.total) * 50;
              console.log(progress);

              setProgress(progress);
            },
            onDownloadProgress: (progressEvent: any) => {
              const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
              console.log(progress);
              setProgress(progress);
            },
          });

          if (response.status === 200) {
            // const res = await response.json();
            const { secure_url, public_id } = response.data
            toast.success("Vedio uploaded successfully")

            const secondresponse = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN}/api/summary`, { ...editedCourse!, url: secure_url, publicId: public_id, ...data });
            if (secondresponse.status === 200) {
              const updatedUser: Summary = { ...editedCourse!, url: secure_url, ...data };
              updateCourse(updatedUser);
              setEditMode(false);
              setLoading(false);
              toggleModal();
              reset()
              toast.success("Content Updated successfully")
            }

          }
        } catch (error: any) {
          console.log(error)
          setLoading(false);
          toast.error(error.response.data.message);
        }

      } else {
        try {
          const secondresponse = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN}/api/summary`, { ...editedCourse, ...data });
          if (secondresponse.status === 200) {
            const updatedUser: Summary = { ...editedCourse, ...data };
            updateCourse(updatedUser);
            setEditMode(false);
            setLoading(false);
            toggleModal();
            reset()
            toast.success("Content Updated successfully")
          }
        } catch (error) {

        }



      }

    } else {
      setPlus(false);
      setLoading(true);


      try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/destiny1233/video/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: any) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 50;

            setProgress(progress);
          },
          onDownloadProgress: (progressEvent: any) => {
            const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;

            setProgress(progress);
          },
        });

        if (response.status === 200) {

          const { secure_url, public_id } = response.data
          toast.success("Vedio added successfully")

          const secondresponse = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/summary`, { ...data, url: secure_url, publicId: public_id, courseId: summaryid });
          if (secondresponse.status === 200) {   
            const newUser: Summary = { ...data, url: secure_url,_id: secondresponse.data.savedSummary._id };
            dispatch({ type: 'ADD_USER', payload: newUser });
            setPlus(true);
            setLoading(false);
            toggleModal();
            reset();
            toast.success("Content added successfully")
          }

        }
      } catch (error: any) {
        setLoading(false)
        toast.error(error.response.data.error);
      }
    }
  };

  const cleardatas = () => {
    setEditMode(false)
    reset({ outline: "", description: "" });
    setSelectedImageFile(undefined)
    setEditImageFile(undefined)
    setShowVedioModal(false)

  }


  return (
    <div>

      <Button onClick={toggleModal} plus={true}>Add Content</Button>

      <Modal clear={cleardatas} isOpen={isModalOpen} toggleModal={toggleModal}>
        {(progress > 0 && progress < 100) && <ProgressBar progress={progress * 2} />}
        {deletemodal ?
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
                  {...register("outline")}
                  type="text"
                  placeholder="course title"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Vedio</span>
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

                        toast.error("File size exceeds the maximum limit (50MB).")

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
                <textarea {...register("description")} placeholder="Course description" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
              </div>







              <Button disabled={!loading} loading={loading} plus={plus && !editMode}>{(!editMode && loading)
                ? "Adding Content"
                : (editMode && loading)
                  ? "Updating Content"
                  : (editMode)
                    ? "Edit Content"
                    : "Add Content"}</Button>
            </form></>)}
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
