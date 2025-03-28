"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Loader2, ChevronLeft, ChevronRight, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AllUsersTable from "@/components/super-admin/all-users-table";
import { Input } from "@/components/ui/input";
import { downloadCSV } from "@/lib/utils";

const PAGE_SIZE = 20;

const ViewAllUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageInputValue, setPageInputValue] = useState("");
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

  const isPageValid = (page) =>
    page > 0 && page <= Math.ceil(users.length / PAGE_SIZE);

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
        <AllUsersTable
          data={users.map((user, index) => ({ ...user, sn: index + 1 }))}
          page={page}
          pageSize={PAGE_SIZE}
        />
        <div className="current-page-number">
          Current Page: {page} / {Math.ceil(users.length / PAGE_SIZE)}
        </div>
      </div>

      <div className="paingation my-8 justify-around flex gap-4 flex-col md:flex-row">
        <Button
          variant="outline"
          onClick={() => {
            if (isPageValid(page - 1)) setPage(page - 1);
          }}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        <div className="flex max-md:flex-col gap-2">
          <Input
            type="number"
            placeholder="Enter Page"
            value={pageInputValue}
            onChange={(e) => {
              setPageInputValue(e.target.value);
            }}
          />
          <Button
            variant="outline"
            onClick={() => {
              if (isPageValid(pageInputValue)) setPage(pageInputValue);
            }}
          >
            Go to page
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            if (isPageValid(page + 1)) setPage(page + 1);
          }}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </>
  );
};

export default ViewAllUsers;
