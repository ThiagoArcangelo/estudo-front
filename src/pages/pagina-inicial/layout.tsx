// import type { ReactNode } from "react";
// import { Outlet } from "react-router-dom"
import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/menu";

export default function Layout() {
  return (
    <div className="w-full h-screen flex flex-col ">
      <div className="w-full h-20">
        <Menu />
      </div>
      <div className="w-full h-screen flex-1">
        <Outlet />
      </div>
    </div>
  );
}
