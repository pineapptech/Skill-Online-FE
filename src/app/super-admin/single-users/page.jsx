"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Loader2, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import SingleUsersTable from "@/components/super-admin/single-users-table";
import { downloadCSV } from "@/lib/utils";
import {
  PAGE_SIZE,
  PageControls,
} from "@/components/super-admin/page-controls";

const ViewAllUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get("/status")
      .then((res) => {
        setUsers(res.data);
        setError("");
      })
      .catch((error) => {
        console.log("Error fetching all  users", error);
        setError(error.response?.data?.message ?? "Error fetching all users");
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

  return (
    <>
      <div className="px-4 flex flex-col gap-4">
        <Button
          variant="outline"
          onClick={() => downloadCSV(users, "users.csv")}
          className="self-center"
        >
          <DownloadIcon className="size-4" />
          Download CSV
        </Button>
        <SingleUsersTable
          data={users.map((user, index) => ({ ...user, sn: index + 1 }))}
          page={page}
        />
        <div className="current-page-number">
          Current Page: {page} / {Math.ceil(users.length / PAGE_SIZE)}
        </div>
      </div>

      <PageControls
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(users.length / PAGE_SIZE)}
      />
    </>
  );
};

export default ViewAllUsers;
