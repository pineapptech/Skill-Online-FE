"use client";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Loader2, DownloadIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import BulkUsersTable from "@/components/super-admin/bulk-users-table";
import { downloadCSV, cn } from "@/lib/utils";
import { PageControls } from "../../../components/super-admin/page-controls";
import { CanceledError } from "axios";

const ViewAllAdmin = () => {
  const [userData, setUserData] = useState(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);

  const fetchUsers = useCallback(
    async (controller) => {
      setIsLoadingUsers(true);
      try {
        const response = await axiosInstance.get(
          `/v1/bulk-admin/bulk-users?limit=20&page=${page}`,
          {
            signal: controller?.signal,
          }
        );
        setUserData(response.data);
        setError("");
      } catch (error) {
        console.log("Error fetching all  users", error);
        if (!(error instanceof CanceledError)) {
          setError(error.response?.data?.message ?? "Error fetching all users");
          setUserData(null);
        }
      } finally {
        setIsLoadingUsers(false);
      }
    },
    [page]
  );

  const handleDownloadCSV = async () => {
    setIsDownloadingCSV(true);
    try {
      const response = await axiosInstance.get(
        `/v1/bulk-admin/bulk-users?limit=${userData.totalUsers}`
      );
      downloadCSV(response.data.users, "admin-users.csv");
      setIsDownloadingCSV(false);
    } catch (error) {
      console.log("Error downloading CSV", error);
      alert("Error downloading CSV");
      setIsDownloadingCSV(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(controller);

    return () => controller.abort();
  }, [fetchUsers, page]);

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center min-h-20 p-4">
        <Loader2 className="animate-spin size-14" />
      </div>
    );
  }

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center min-h-20 p-4">
        <Loader2 className="animate-spin size-14" />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div>
        <div className="flex flex-col gap-4 items-center justify-center min-h-24 p-4">
          <p className="text-red-500 text-center max-w-[66ch] min-w-[40ch] mx-auto">
            An error occurred while fetching users: {error}
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
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="outline"
            onClick={handleDownloadCSV}
            disabled={isDownloadingCSV || isLoadingUsers}
            className="self-center"
          >
            {isDownloadingCSV ? (
              <Loader2 className="animate-spin size-4" />
            ) : (
              <DownloadIcon className="size-4" />
            )}
            Download CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => fetchUsers()}
            disabled={isLoadingUsers}
          >
            <RefreshCcw
              className={cn("size-4", isLoadingUsers && "animate-spin")}
            />
            Refresh
          </Button>
        </div>
        <BulkUsersTable
          data={userData?.users}
          page={page}
          isLoading={!userData && !error}
        />

        <div className="current-page-number py-2">
          Current Page: {page} / {userData?.totalPages || page}
          <hr className="w-60 my-1 border-current" />
          Total Users: {(userData?.totalUsers).toLocaleString()}
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
