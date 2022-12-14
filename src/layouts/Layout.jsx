import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const [drawerHidden, setDrawerHidden] = useState("hidden");
  return (
    <>
      <Header setDrawerHidden={setDrawerHidden} />
      <main className="mt-14">{children}</main>
      <div className={"h-screen fixed top-14 " + drawerHidden}>
        <div className="drawer z-0">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content"></div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content z-50">
              <li>
                <Link to="/test">Sidebar Item 1</Link>
              </li>
              <li>
                <Link to="#">Sidebar Item 2</Link>
              </li>
              <Footer />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
