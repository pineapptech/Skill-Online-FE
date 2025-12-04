import React, { Suspense } from "react";
import Navbar from "@/components/navbar";
import NoticeDialog from "@/components/notice-dialog";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      {/* <NoticeDialog /> */}
    </>
  );
};

export default PublicLayout;
