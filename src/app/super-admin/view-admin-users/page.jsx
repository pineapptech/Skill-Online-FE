"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Loader2, ChevronLeft, ChevronRight, DownloadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AllAdminTable from "@/components/super-admin/all-admin-table";
import { downloadCSV } from "@/lib/utils";

const ViewAllAdmin = () => {
  const [userData, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageInputValue, setPageInputValue] = useState("");
  const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);
  const router = useRouter();

  useEffect(() => {
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

  if (!userData && !error) {
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

  const isPageValid = (page) => page > 0 && page <= userData.totalPages;
  const users = userData.emails.map((email, index) => ({
    sn: index + 1,
    email,
  }));

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
                downloadCSV(
                  res.data.emails.map((email, index) => ({
                    sn: index + 1,
                    email,
                  })),
                  "admin-users.csv"
                );
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
        <AllAdminTable data={users} page={page} />
        <div className="current-page-number py-2">
          Current Page: {page} / {userData.totalPages}
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

export default ViewAllAdmin;
