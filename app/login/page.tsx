"use client";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import Link from "next/link";
import image from "/public/images/auth.jpeg"
interface IFormInput {
  email: string
  password: string
}

const Login = () => {

  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    toast.success("Logged in successfully");
    router.push("/");
    console.log(data)
  }



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

            <button type="submit" className="btn btn-neutral">
              Login
            </button>

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
