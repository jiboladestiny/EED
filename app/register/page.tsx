"use client";

// import axios from "axios";
// import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm ,SubmitHandler} from "react-hook-form";
import Link from "next/link";
import image from "/public/images/auth.jpeg";
interface RegisterInput{
  name: string,
  email: string,
  password:string
}

const Register = () => {
  const router = useRouter();
const { register, handleSubmit } = useForm<RegisterInput>();
  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    toast.success("User has been registered!");
    router.push("/");

    console.log(data)

};

  // const registerUser = async (e) => {
  //   e.preventDefault();

  //     router.push("/");

    // axios
    //   .post("/api/register", data)
    //   .then(() => toast.success("User has been registered!"))
    //   .catch(() => toast.error("Something went wrong!"));
  // };

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.push("/");
  //   }
  // });

  return (
    <div
      className="min-h-screen "
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute w-full h-full bg-black/40 flex items-center justify-center">
        <div className="w-full max-w-sm bg-white p-[2rem]">
          <h2 className="text-2xl mb-3 font-semibold">Register</h2>

          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Colins megan"
                className="input input-bordered w-full max-w-sm"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
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
                {...register("password", { required: true })}
                type="password"
                placeholder="/12/defds"
                className="input input-bordered w-full max-w-sm"
              />
            </div>

            <button type="submit" className="btn btn-neutral">
              Register
            </button>
            <Link href="/login">
              <span className="text-center">
                Already have an account?{" "}
                <span className="text-green-500 font-semibold cursor-pointer">
                  Log in
                </span>
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
