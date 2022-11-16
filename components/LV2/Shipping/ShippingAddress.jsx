import React, { useContext, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Context } from "../../../Store/context";
import { useRouter } from "next/router";

const shippingSchema = yup.object({
  fullname: yup.string().required("Full name is required."),
  address: yup.string().required("Address is required."),
  city: yup.string().required("City is required."),
  postal: yup.string().required("Postal is required."),
  country: yup.string().required("Country is required."),
});

const ShippingAddress = () => {
  const cartCtx = useContext(Context);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(shippingSchema),
    // defaultValues: cartCtx.shippingAddress.shippingAddress,
  });

  useEffect(() => {
    if (cartCtx.shippingAddress) {
      setValue("fullname", cartCtx.shippingAddress.fullname);
      setValue("address", cartCtx.shippingAddress.address);
      setValue("postal", cartCtx.shippingAddress.postal);
      setValue("country", cartCtx.shippingAddress.country);
      setValue("city", cartCtx.shippingAddress.city);
    }
  }, [cartCtx.shippingAddress, setValue]);

  //* ========== SUBMIT SHIPPING ADDRESS =============
  const onSubmit = (data) => {
    cartCtx.saveAddress(data);
    router.push("/payment");
  };

  return (
    <form
      className="mt-6 max-w-screen-md mx-auto text-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="mb-4 text-xl font-bold">Shipping</h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          className="w-full"
          type="text"
          autoFocus
          {...register("fullname")}
        />
        <p className="text-red-600 text-sm mt-1">{errors.fullname?.message}</p>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          className="w-full"
          type="text"
          {...register("address")}
        />
        <p className="text-red-600 text-sm mt-1">{errors.address?.message}</p>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="city">City</label>
        <input id="city" className="w-full" type="text" {...register("city")} />
        <p className="text-red-600 text-sm mt-1">{errors.city?.message}</p>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="postal">Postal Code</label>
        <input
          id="postal"
          className="w-full"
          type="string"
          {...register("postal")}
        />
        <p className="text-red-600 text-sm mt-1">{errors.postal?.message}</p>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="country">Country</label>
        <input
          id="country"
          className="w-full"
          type="text"
          {...register("country")}
        />
        <p className="text-red-600 text-sm mt-1">{errors.country?.message}</p>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="primary-button">
          Next
        </button>
      </div>
    </form>
  );
};

export default ShippingAddress;
