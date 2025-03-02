"use client";

import React, { useEffect } from "react";
import Footer from "../Footer";
import { useStateContext } from "../../utils/context/StateContext";
import { Meta, PageMeta } from "../Meta";
import Header from "../Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  navigationPaths?: {
    menu?: unknown;
    [key: string]: unknown;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, title, navigationPaths }) => {
  const { navigation, setNavigation } = useStateContext();

  useEffect(() => {
    let isMounted = true;

    if (
      !navigation?.hasOwnProperty("menu") &&
      navigationPaths?.hasOwnProperty("menu") &&
      isMounted
    ) {
      setNavigation(navigationPaths);
    }

    return () => {
      isMounted = false;
    };
  }, [navigation, navigationPaths, setNavigation]);

  return (
    <>
      <Meta />
      <PageMeta
        title={title || "uNFT Marketplace"}
        description={
          "uNFT Marketplace built with Cosmic CMS, Next.js, and the Stripe API"
        }
      />

      <div className="overflow-hidden mt-12">
        <Header />
        <main className="w-full flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
