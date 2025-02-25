"use client";
import { useEffect, useState } from "react";
import UsersTable from "@/components/admin/users-table";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axiosInstance
      .get("/v1/bulk-admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.data);
        setError("");
      })
      .catch((error) => {
        console.log("Error fetching admin users", error);
        if (error.status === 401) {
          router.push("/auth/bulk/login");
        } else {
          setError(
            error.response?.data?.message ?? "Error fetching admin users"
          );
        }
        setUsers(null);
      });
  }, [router]);

  if (!users && !error) {
    return (
      <div className="flex items-center justify-center min-h-20 p-4">
        <Loader2 className="animate-spin size-14" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex flex-col gap-4 items-center justify-center min-h-24 p-4">
          <p className="text-red-500 text-center max-w-[66ch] min-w-[40ch] mx-auto">
            {error}
          </p>
          <Button
            variant="outline"
            className="border-red-500 text-red-500"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div>
        <div className="flex flex-col gap-4 justify-center min-h-24 p-4">
          <p className="border rounded-md p-4 text-center max-w-[66ch] min-w-[40ch] mx-auto">
            No users found. Users that registered under you using your bulkID
            will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UsersTable data={users} />
    </div>
  );
};

export default AdminUsers;
