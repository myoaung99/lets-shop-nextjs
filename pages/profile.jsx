import { unstable_getServerSession } from "next-auth";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import db from "../utils/db";
import { authOptions } from "./api/auth/[...nextauth]";

const ProfileScreen = ({ userInfo }) => {
  const [profileImg, setProfileImg] = useState(userInfo.image);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(registerSchema),
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
    },
  });

  const showCompanyLogoPreview = (event) => {
    if (event.target.files.length > 0) {
      // const src = URL.createObjectURL(event.target.files[0]);
      // setCompanyLogo(src);

      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
    }
  };

  const onSubmit = (data) => {
    console.log({ ...data, profileImg: profileImg });
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="text-black">
        <h2 className="text-lg font-bold">User Profile</h2>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <div className="img-container flex justify-center items-center w-[100px] h-[100px] bg-slate-100 rounded-full overflow-hidden ">
              {profileImg === "f" ? (
                <p className="text-xs text-slate-400">No Image</p>
              ) : (
                <Image
                  src={profileImg}
                  width={100}
                  height={100}
                  alt={userInfo.name}
                  className="object-fit"
                />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={showCompanyLogoPreview}
              id="select-img"
              hidden
            />
            <label htmlFor="select-img">
              <span className="primary-sm-button">Upload</span>
            </label>
          </div>

          <div className="flex flex-col ">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="w-full text-sm pl-2"
              type="text"
              autoFocus
              {...register("name")}
            />
            <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full  text-sm pl-2"
              type="email"
              autoFocus
              {...register("email")}
            />
            <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
          </div>
          <div className="flex w-full">
            <button className="primary-button ml-auto">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProfileScreen.protected = true;
export default ProfileScreen;

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const { user } = session;

  return {
    props: {
      userInfo: db.convertDocToObj(user),
    },
  };
};
