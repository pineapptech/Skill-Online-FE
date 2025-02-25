import AdminNav from "@/components/admin/admin-nav";
import Navbar from "@/components/navbar";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <AdminNav />
      <div className="px-4">{children}</div>
    </>
  );
};

export default AdminLayout;
