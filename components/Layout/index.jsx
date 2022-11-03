import Head from "next/head";
import Link from "next/link";
import React from "react";

const Layout = ({ children, title }) => {
  return (
    <main className="bg-white">
      <Head>
        <title>{title ? title : "Let's Shop"}</title>
        <meta
          name="description"
          content="World's best e-commerce platform where you can get everything"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen justify-between">
        <header>
          <nav className="h-12 shadow flex justify-between items-center px-5">
            <Link
              href="/"
              className="text-xl text-black font-bold hover:text-yellow-500"
            >
              Let`s Shop
            </Link>
            <div className="space-x-4">
              <Link href="/cart" className="text-black">
                Cart
              </Link>
              <Link href="/login" className="text-black">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="h-10 flex justify-center items-center text-neutral-500">
          Copyright 2022 Let`s Shop
        </footer>
      </div>
    </main>
  );
};

export default Layout;
