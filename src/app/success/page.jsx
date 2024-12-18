"use client";
import React from "react";
import LoadingDialog from "@/components/ui/loading-dialog";
import { redirect, useSearchParams } from "next/navigation";

const SuccessfulPayment = () => {
  const searchParams = useSearchParams();

  redirect(`/auth/payment/verify?${searchParams.toString()}`);

  return (
    <LoadingDialog
      open={verifyStatus?.status === "submitting"}
      title="Verifying Payment..."
    />
  );
};

export default SuccessfulPayment;
