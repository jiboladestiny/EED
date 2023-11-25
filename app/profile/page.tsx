"use client"
import { Data } from "../context/DataProvider";
import Cookies from 'js-cookie';

const Profile = () => {
    const { data } = Data()
    const role = Cookies.get('role');

    return (
        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
            <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">User Profile</h2>
            <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Personal Information</h2>


            <div>
                <form action="">

                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"

                            placeholder="Name"
                            className="input input-bordered w-full max-w-sm"
                            value={data?.name}
                            disabled
                        />
                    </div>


                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered w-full max-w-sm"
                            value={data?.email}
                            disabled
                        />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <input
                            type="text"
                            placeholder="role"
                            className="input input-bordered w-full max-w-sm"
                            value={data?.isAdmin == "1"
                                ? "USER"
                                : data?.isAdmin == "3"
                                    ? "ADMIN"
                                    : data?.isAdmin == "2"
                                        ? "INSTRUCTOR"
                                        : data?.isAdmin}
                            disabled
                        />
                    </div>


                </form>
            </div>
        </div>
    )
}

export default Profile
