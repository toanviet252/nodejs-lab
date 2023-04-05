/* eslint-disable */
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../components/admin-components/header/Header";
import SidebarMenu from "../../components/admin-components/sidebar/Sidebar";
import LoadingFallback from "../../components/Suspsen/SuspsenFallback";
import "./index.css";

const Dashboard = lazy(() => import("./dashboard/Dasboard"));
const User = lazy(() => import("./users/User"));
const Hotel = lazy(() => import("./hotels/Hotel"));
const Room = lazy(() => import("./rooms/Room"));
const Transaction = lazy(() => import("./transactions/Transaction"));

export const AdminPage = () => {
  return (
    <>
      <Header />
      <div style={{ display: "flex", width: "100vw" }}>
        <SidebarMenu />
        <div className="admin-content-container">
          <Suspense fallback={LoadingFallback}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<User />} />
              <Route path="/hotels" element={<Hotel />} />
              <Route path="/rooms" element={<Room />} />
              <Route path="/transactions" element={<Transaction />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};
