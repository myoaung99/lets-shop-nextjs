import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const profileSchema = yup.object({
  name: yup.string().required("Name is required."),
  email: yup.string().email().required("Email is required."),
});

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState();
  const [profileImg, setProfileImg] = useState(undefined);

  const { data: session } = useSession();

  console.log(session);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    async function getUser() {
      await axios
        .get("/api/user")
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("No user was found");
          }
          console.log(res.data.user);
          setUserInfo(res.data.user);
        })
        .catch((err) => console.log(err));
    }
    getUser();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo.name);
      setValue("email", userInfo.email);
      setProfileImg((userInfo.image && userInfo.image) || undefined);
    }
  }, [userInfo, setValue]);

  const watchName = watch("name");
  const watchEmail = watch("email");

  const showCompanyLogoPreview = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
    }
  };

  const onSubmit = async (data) => {
    if (
      watchName !== userInfo?.name ||
      watchEmail !== userInfo?.email ||
      profileImg
    ) {
      console.log({ ...data, profileImg: profileImg });
      const res = await axios.put("/api/user", { ...userInfo, ...data });
      if (res.status === 200) {
        toast.success("Successfully updated");
      } else {
        toast.error("Failed to update!");
      }
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="text-black">
        <h2 className="text-lg font-bold">User Profile</h2>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-4">
            <div className="img-container flex justify-center items-center w-[100px] h-[100px] bg-slate-100 rounded-full overflow-hidden ">
              {!profileImg ? (
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
              {...register("email")}
            />
            <p className="text-red-600 text-sm mt-1">{errors.email?.message}</p>
          </div>
          <div className="flex w-full">
            {watchName !== userInfo?.name ||
            watchEmail !== userInfo?.email ||
            profileImg ? (
              <button className="primary-button ml-auto">Update</button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

ProfileScreen.protected = true;
export default ProfileScreen;
