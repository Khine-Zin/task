import React from "react";
import Layout from './Layout';
import LoginPage from "../Pages/LoginPage";
import userStore from "../store/userStore";
import { Toaster } from "react-hot-toast";



const MainLayout = () => {
  const { user } = userStore();
  const role = localStorage.getItem("userRole");



  return (
    <div>
     <Toaster autoclose={2000} />
    {role || user ? <Layout /> : <LoginPage />}
    </div>
  );
};

export default MainLayout;
