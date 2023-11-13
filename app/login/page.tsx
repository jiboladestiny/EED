"use client";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import Link from "next/link";
import image from "/public/images/auth.jpeg"
import { useState } from "react";
import Button from "../component/Button";
import axios from "axios";
import { Data } from "../context/DataProvider";
import userData from "@/helpers/userData";
import Cookies from 'js-cookie';

interface IFormInput {
  email: string
  password: string
}

const Login = () => {
  const { setUserData } = Data()

  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("api/login", data);
 
      if(res.status == 200){
      
        toast.success(res.data.message);
       

        const datas = await userData();

        setUserData(datas.data);
        Cookies.set('role', datas.data.isAdmin, { expires: 7 });
        Cookies.set('userdata', datas.data._id, { expires: 7 });

       const role = Cookies.get('role')
        if (role == "1") {
          router.push("/user");
        }

        if (role == "3") {
          router.push("/admin/instructor");
        }

        if (role == "2") {
          router.push("/admin");
        }
       
        setLoading(false);
      }
      
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.error || "An error occurred during login. Please try again.");
    } 
  };

 

  return (
    <div
      className="min-h-screen "
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {" "}
      <div className="absolute w-full h-full bg-black/40 flex items-center justify-center">
        {" "}
        <div className="w-full max-w-sm bg-white p-[2rem]">
          <h2 className="text-2xl mb-3 font-semibold">Login</h2>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true, maxLength: 20 })}
                type="text"
                placeholder="example@gmail.com"
                className="input input-bordered w-full max-w-sm"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="/12/defds"
                className="input input-bordered w-full max-w-sm"
              />
            </div>

            <Button disabled={!loading} loading={loading}>{loading ? "Logging in" : "Login"}</Button>

            <Link href="/register">
              <span className="text-center">
                Dont have an account?{" "}
                <span className="text-green-500 font-semibold cursor-pointer">
                  Create one
                </span>
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
