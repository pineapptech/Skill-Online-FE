import QRCode from "@/components/qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import courses from "@/data/courses";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }) {
  const { userId } = params;

  const response = await axiosInstance.get("/v1/auth/get-users");
  const user = response.data.data.find((user) => user._id === userId);

  return {
    title: user ? `${user.firstName} ${user.lastName}` : "User Profile",
  };
}

const UserDetails = async ({ params }) => {
  const { userId } = params;

  let user;

  try {
    const response = await axiosInstance.get("/v1/auth/get-users");
    user = response.data.data.find((user) => user._id === userId);

    if (!user) throw new Error("User not found");
  } catch {
    notFound();
  }

  const details = {
    name: `${user.firstName} ${user.lastName}`,
    course:
      courses.find((course) => course.id === user.course)?.name ?? user.course,
    regNo: user.regNo,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    address: user.address,
    idType: user.passportId,
    address: user.address,
  };

  const hasProfileImage = /(jpg|png|jpeg)$/.test(user.photoUrl);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-fits min-w-60 container shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex md:items-center max-md:flex-col gap-4">
            {hasProfileImage && (
              <div className="basis-1/2">
                <img
                  src={user.photoUrl}
                  alt="User Image"
                  className="w-full p-1 border rounded-lg"
                />
              </div>
            )}

            <div
              className={cn(
                "space-y-2 text-gray-700 basis-1/2",
                !hasProfileImage && "text-center grow"
              )}
            >
              {Object.entries(details).map(([key, value]) => (
                <p key={key} className="my-0">
                  <span className="font-bold capitalize">
                    {key.replace(/([a-z])([A-Z])/g, "$1 $2")}:
                  </span>{" "}
                  <span>{value}</span>
                </p>
              ))}
            </div>
          </div>

          <hr className="my-4 border-2" />

          <QRCode />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
