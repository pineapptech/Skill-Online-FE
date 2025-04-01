"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { Loader2, DownloadIcon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, downloadCSV } from "@/lib/utils";
import {
  PAGE_SIZE,
  PageControls,
} from "@/components/super-admin/page-controls";
import AllUsersInfoTable from "@/components/super-admin/all-users-info-table";
import { CanceledError } from "axios";
import courses from "@/data/courses";

const ViewAllUsersInfo = () => {
  const [users, setUsers] = useState(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchUsers = async (controller) => {
    setIsLoadingUsers(true);

    try {
      const response = await axiosInstance.get("/users", {
        signal: controller?.signal,
      });
      setUsers(response.data.users);
      setError("");
    } catch (error) {
      console.log("Error fetching all  users", error);
      if (!(error instanceof CanceledError)) {
        setError(error.response?.data?.message ?? "Error fetching all users");
      }
      setUsers(null);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(controller);

    return () => controller.abort();
  }, []);

  if ((!users && !error) || isLoadingUsers) {
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
            An error occurred while fetching users: {error}
          </p>
          <Button
            variant="outline"
            className="border-red-500 text-red-500"
            onClick={() => window.location.reload()}
            disabled={isLoadingUsers}
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
        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            variant="outline"
            onClick={() => {
              const resolvedUsers = users.map((user) => ({
                ...user,
                paymentCount: user.payments.length,
                course:
                  courses.find((course) => course.id === user.course)?.name ??
                  user.course,
              }));
              downloadCSV(resolvedUsers, "all-users-info.csv");
            }}
            className="self-center"
            disabled={isLoadingUsers}
          >
            <DownloadIcon className="size-4" />
            Download CSV
          </Button>
          <Button
            variant="outline"
            onClick={fetchUsers}
            className="self-center"
            disabled={isLoadingUsers}
          >
            <RefreshCcw
              className={cn("size-4", isLoadingUsers && "animate-spin")}
            />
            Refresh
          </Button>
        </div>
        <AllUsersInfoTable
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

export default ViewAllUsersInfo;
