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

const columns = [
  { header: "SN", cell: ({ index }) => index + 1 },
  {
    header: "Email",
    accessor: "email",
  },
];

const AllAdminTable = ({ data }) => {
  const [filterText, setFilterText] = useState("");

  const filteredData = data.filter((item) => {
    const filter = filterText.trim().toLowerCase();

    return item.email.toLowerCase().includes(filter);
  });

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
            {filteredData.map((row, index) => (
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
            {filteredData.length === 0 && (
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

export default AllAdminTable;
