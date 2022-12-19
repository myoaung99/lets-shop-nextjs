import Head from "next/head";
import Link from "next/link";
import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Context } from "../../Store/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownMenuItem from "../LV2/UI/DropdownMenuItem";
import { signOut } from "next-auth/react";
import useCartCount from "../../hooks/useCartCount";

const LayoutContext = createContext({});
const Layout = ({ children }) => {
  //*======== Get session object and status from next-auth ===============
  const { status, data: session } = useSession();
  const cartCtx = useContext(Context);
  //* custom hook for tracking cart count
  const cartCount = useCartCount();

  //*=================== Handle Signout =========================
  const signOutHandler = useCallback(() => {
    cartCtx.resetCart();
    //*=============== Go to Login Screen after signout ============
    signOut({ callbackUrl: "/login" });
  }, [cartCtx]);

  const memorizedValues = useMemo(
    () => ({
      cartCount,
      session,
      signOutHandler,
      status,
    }),
    [cartCount, session, signOutHandler, status]
  );

  return (
    <main className="bg-white">
      <PageHeadConfig />
      {/* //*==================== REACT TOASTIFY ============================= */}
      <ToastContainer position="bottom-left" limit={1} />

      <LayoutContext.Provider value={memorizedValues}>
        <div className="flex flex-col min-h-screen justify-between">
          {children}
        </div>
      </LayoutContext.Provider>
    </main>
  );
};

/**
 * page config sub components
 */
const PageHeadConfig = () => {
  return (
    <Head>
      <meta
        name="description"
        content="World's best e-commerce platform where you can get everything"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

/**
 * navbar sub component
 * @returns NavBar
 */
const NavBar = () => {
  const { cartCount, session, signOutHandler, status } =
    useContext(LayoutContext);

  return (
    <header>
      <nav className="h-14 shadow flex justify-between items-center px-5">
        <Link
          href="/"
          className="text-xl text-black font-bold hover:text-yellow-500"
        >
          Let`s Shop
        </Link>

        <div className="space-x-4">
          <Link href="/cart" className="text-black">
            Cart
            <span className="bg-red-600 px-2 py-1 ml-1 rounded-full text-white text-sm">
              {cartCount}
            </span>
          </Link>

          {status === "loading" ? (
            "Loading"
          ) : session?.user ? (
            <Menu as="div" className="relative inline text-black z-50">
              <Menu.Button className="text-amber-500 hover:text-amber-600 py-1">
                {session.user.name}
              </Menu.Button>
              <Menu.Items className="absolute border w-32 rounded right-0 h-fit bg-white shadow-lg">
                <DropdownMenuItem href="/profile">Profile</DropdownMenuItem>
                <DropdownMenuItem href="/orders">
                  Order History
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOutHandler} href="/logout">
                  Logout
                </DropdownMenuItem>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login" className="text-black">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

const Main = ({ children }) => (
  <main className="container m-auto mt-4 px-4">{children}</main>
);

const Footer = () => (
  <footer className="h-10 mt-3 text-sm flex justify-center items-center text-neutral-500">
    Copyright 2022 Let`s Shop
  </footer>
);

Layout.Navbar = NavBar;
Layout.Main = Main;
Layout.Footer = Footer;

/**
 * Usage Component
 * @param {children} param0
 * @returns Layout Component
 */
const Usage = ({ children }) => {
  return (
    <Layout>
      <Layout.Navbar />
      <Layout.Main>{children}</Layout.Main>
      <Layout.Footer />
    </Layout>
  );
};

export default Usage;
