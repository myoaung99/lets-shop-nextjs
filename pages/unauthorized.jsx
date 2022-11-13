import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <>
      <Head>
        <title>Unauthorized</title>
      </Head>
      <div className="text-black">
        <div className="">
          <h1 className="text-xl font-bold">Access Denied</h1>
          <div className="flex gap-2">
            <p>
              {message
                ? message + "."
                : "You don't have the permission to access this page."}
            </p>
            <Link href="/login" className="underline">
              <p>Login </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
