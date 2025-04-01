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
import { SearchIcon } from "lucide-react";
import { PAGE_SIZE } from "./page-controls";
import courses from "@/data/courses";

const columns = [
  { header: "SN", accessor: "sn" },
  {
    header: "Name (firstname lastname)",
    accessor: "firstName",
    cell: ({ row }) => `${row.firstName} ${row.lastName}`,
  },
  { header: "Reg No", accessor: "regNo" },
  {
    header: "Course",
    accessor: "course",
    cell: ({ row }) => {
      return (
        courses.find((course) => row.course === course.id)?.name ?? row.course
      );
    },
  },
  { header: "Email", accessor: "email" },
  { header: "Phone Number", accessor: "phone" },
  {
    header: "Payment Count",
    accessor: "payments",
    cell: ({ row }) => `${row.payments.length}`,
  },
];

const AllUsersInfoTable = ({ data, page }) => {
  const [filterText, setFilterText] = useState("");

  const filteredData = data.filter((item) => {
    const filter = filterText.trim().toLowerCase();

    return (
      item.email.toLowerCase().includes(filter) ||
      item.firstName.toLowerCase().includes(filter) ||
      item.lastName.toLowerCase().includes(filter) ||
      item.course.toLowerCase().includes(filter) ||
      item.regNo.toLowerCase().includes(filter) ||
      item.phone.toLowerCase().includes(filter) ||
      `payment:${item.payments.length.toString()}` === filter
    );
  });

  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

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
            {paginatedData.map((row, index) => (
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
            {paginatedData.length === 0 && (
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

export default AllUsersInfoTable;
