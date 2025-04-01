"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { Loader2, SearchIcon } from "lucide-react";
import { PAGE_SIZE } from "./page-controls";

const BulkUsersTable = ({ data, page, isLoading }) => {
  const [filterText, setFilterText] = useState("");

  const filteredData = data?.filter((item) => {
    const filter = filterText.trim().toLowerCase();

    return item.email.toLowerCase().includes(filter);
  });

  const columns = [
    { header: "SN", cell: ({ index }) => index + 1 + (page - 1) * PAGE_SIZE },
    { header: "Full Name", accessor: "fullname" },
    { header: "Reg Number", accessor: "regNo" },
    {
      header: "Email",
      accessor: "email",
    },
    { header: "Course", accessor: "course" },
    { header: "Address", accessor: "address" },
    { header: "Province", accessor: "province" },
    { header: "Gender", accessor: "gender" },
  ];

  return (
    <div className="w-fit max-w-full mx-auto">
      <div className="filter relative mb-4">
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-2 size-4" />
        <Input
          placeholder="Search..."
          className="size-full p-3 pl-8"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <div className="w-[calc(100vw-4rem)] overflow-auto border rounded-md">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.accessor ?? column.header}
                  className="border-r last:border-r-0 bg-primary text-white hover:bg-primary/70"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <div className="flex items-center justify-center min-h-20 p-4">
                    <Loader2 className="animate-spin size-10" />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              filteredData?.map((row, index) => (
                <TableRow key={row.email}>
                  {columns.map((column) => {
                    let cell = row[column.accessor];
                    if (typeof column.cell === "function") {
                      cell = (
                        <column.cell
                          row={row}
                          data={data}
                          columns={columns}
                          index={index}
                        />
                      );
                    }
                    return (
                      <TableCell
                        key={column.accessor ?? column.header}
                        className="border-r last:border-r-0"
                      >
                        {cell}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            {filteredData?.length === 0 && (
              <TableRow className="w-full">
                <TableCell colSpan={columns.length} className="text-center">
                  No entry found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BulkUsersTable;
