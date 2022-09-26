import Head from "next/head";
import { Fragment, memo, ReactNode, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { NavBar } from "./NavBar";

export const Layout = memo(function Layout(props: {
  title?: string;
  children: ReactNode;
}) {
  const [isNavBarOpened, setIsNavBarOpened] = useState(false);

  return (
    <Fragment>
      <Head>
        <title>
          {props.title ? `${props.title} | World ID` : "Docs | World ID"}
        </title>
      </Head>

      <div className="grid grid-rows-auto/fr/auto min-h-screen bg-ffffff dark:bg-1b1b1d relative">
        <NavBar isOpened={isNavBarOpened} setIsOpened={setIsNavBarOpened} />

        <Header
          isNavBarOpened={isNavBarOpened}
          setIsNavBarOpened={setIsNavBarOpened}
        />
        <main>{props.children}</main>
        <Footer />
      </div>
    </Fragment>
  );
});
