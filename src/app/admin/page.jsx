"use client";
import React, { useState, useEffect } from "react";
import QRCode from "@/components/qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminDashboard = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const [registrationLink, setRegistrationLink] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axiosInstance
      .get("/v1/bulk-admin/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetails(res.data);
      })
      .catch((error) => {
        console.log("Error fetching admin details", error);
        if (error.status === 401) router.push("/auth/bulk/login");
        else
          setError(
            error.response?.data?.message ?? "Error fetching admin details"
          );
      });
  }, [router]);

  // Create registration link for the QRCode
  useEffect(() => {
    const bulkId = details?.adminDetails?.bulkId;
    if (!bulkId) return;

    setRegistrationLink(
      `${window.location.origin}/auth/bulk/registration?id=${bulkId}`
    );
  }, [details]);

  if (!details && !error) {
    return (
      <div className="flex items-center justify-center min-h-20 p-4">
        <Loader2 className="animate-spin size-14" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-4">
          <Card className="w-fit container shadow-lg rounded-2xl">
            <CardHeader></CardHeader>
            <CardContent className="text-center flex flex-col gap-2">
              {error}
              <Button
                variant="outline"
                className="border-red-500 text-red-500"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-gray-100 p-4">
      <Card className="w-fit min-w-60 container shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Admin Info
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="font-bold">{details?.message}</div>
          <hr className="my-4 border-2" />
          <div className="flex flex-col gap-2 items-center font-bold">
            {details?.number_of_users}
            <Button asChild>
              <Link href="/admin/users">View Users</Link>
            </Button>
          </div>
          <hr className="my-4 border-2" />
          <div className="space-y-2 text-gray-700 basis-1/2 grow">
            {Object.entries(details?.adminDetails ?? {})
              .filter(([key]) => key !== "id")
              .map(([key, value]) => (
                <p key={key} className="my-0">
                  <span className="font-bold capitalize">
                    {key.replace(/([a-z])([A-Z])/g, "$1 $2")}:
                  </span>{" "}
                  <span>{value}</span>
                </p>
              ))}
          </div>
          <hr className="my-4 border-2" />
          {registrationLink && (
            <>
              This is your Bulk Registration QRCode
              <QRCode text={registrationLink} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
