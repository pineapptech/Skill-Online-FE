"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Loader2, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import BulkUsersTable from "@/components/super-admin/bulk-users-table";
import { downloadCSV } from "@/lib/utils";
import { PageControls } from "../../../components/super-admin/page-controls";

const ViewAllAdmin = () => {
  const [userData, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUsers(null);
    axiosInstance
      .get(`/v1/bulk-admin/bulk-users?limit=20&page=${page}`)
      .then((res) => {
        setUsers(res.data);
        setError("");
      })
      .catch((error) => {
        console.log("Error fetching all  users", error);
        setError(error.response?.data?.message ?? "Error fetching all users");
        setUsers(null);
      });
  }, [router, page]);

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
          onClick={() => {
            setIsDownloadingCSV(true);
            axiosInstance
              .get(`/v1/bulk-admin/bulk-users?limit=${userData.totalUsers}`)
              .then((res) => {
                downloadCSV(res.data.users, "admin-users.csv");
                setIsDownloadingCSV(false);
              })
              .catch((error) => {
                console.log("Error downloading CSV", error);
                alert("Error downloading CSV");
                setIsDownloadingCSV(false);
              });
          }}
          disabled={isDownloadingCSV}
          className="self-center"
        >
          {isDownloadingCSV ? (
            <Loader2 className="animate-spin size-4" />
          ) : (
            <DownloadIcon className="size-4" />
          )}
          Download CSV
        </Button>

        <BulkUsersTable
          data={userData?.users}
          page={page}
          isLoading={!userData && !error}
        />

        <div className="current-page-number py-2">
          Current Page: {page} / {userData?.totalPages || page}
        </div>
      </div>

      <PageControls
        page={page}
        setPage={setPage}
        totalPages={userData?.totalPages || Infinity}
      />
    </>
  );
};

export default ViewAllAdmin;
