import Layout from "../components/Layout";
import CartProvider from "../Store/cart-provider";
import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";

//? ==== Component is currently rendering page on the client side
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        {Component.protected === true ? (
          <Auth>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </CartProvider>
    </SessionProvider>
  );
}

//? ========== PROTECTING THE PAGES WITH H.O.F COMPONENT =========
function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return children;
}

export default MyApp;
