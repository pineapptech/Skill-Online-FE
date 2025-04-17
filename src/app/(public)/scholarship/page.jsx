"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const scholarshipData = [
  {
    lga: "Aninri",
    // email: "aninriemergingtech@gmail.com",
    bulkId: "BULK/A/746957",
  },
  {
    lga: "Awgu",
    // email: "awguemergingtechprogram@gmail.com",
    bulkId: "BULK/AETP/388287",
  },
  {
    lga: "Enugu East",
    // email: "enugueastemergingtech@gmail.com",
    bulkId: "BULK/EEET/912199",
  },
  {
    lga: "Enugu North",
    // email: "chijiokediogu@gmail.com",
    bulkId: "BULK/ENET/899780",
  },
  {
    lga: "Enugu South",
    // email: "enugusouthemergingtech@gmail.com",
    bulkId: "BULK/ES/769364",
  },
  {
    lga: "Ezeagu",
    // email: "vudeani@gmail.com",
    bulkId: "BULK/ELET/346586",
  },
  {
    lga: "Igbo-Etiti",
    // email: "igboetitiemergingtechprogram@gmail.com",
    bulkId: "BULK/IE/746846",
  },
  {
    lga: "Igbo-Eze North",
    // email: "igboezenorthemergingtech@gmail.com",
    bulkId: "BULK/IE/195370",
  },
  {
    lga: "Igbo-Eze South",
    // email: "igslg.bursary.scholarship@gmail.com",
    bulkId: "BULK/IE/735676",
  },
  {
    lga: "Isi-Uzo",
    // email: "isiuzoemergingtech@gmail.com",
    bulkId: "BULK/IELT/316437",
  },
  {
    lga: "Nkanu East",
    // email: "nkanueastemergingtech@gmail.com",
    bulkId: "BULK/NE/542745",
  },
  {
    lga: "Nkanu West",
    // email: "oigwesi@gmail.com",
    bulkId: "BULK/NW/794375",
  },
  {
    lga: "Nsukka",
    // email: "nsukkaemergingtech@gmail.com",
    bulkId: "BULK/N/213631",
  },
  {
    lga: "Oji River",
    // email: "emergingtechgojiriver@gmail.com",
    bulkId: "BULK/OR/170339",
  },
  {
    lga: "Udenu",
    // email: "udenuemergingtech@gmail.com",
    bulkId: "BULK/UL/858971",
  },
  {
    lga: "Udi",
    // email: "uditechsolutions1@gmail.com",
    bulkId: "BULK/U/496659",
  },
  {
    lga: "Uzo-Uwani",
    // email: "uzouwaniemergingtech@gmail.com",
    bulkId: "BULK/UU/137843",
  },
];

const ScholarshipPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-4">
        Emerging Tech Scholarship
      </h1>

      <h2 className="text-2xl font-bold text-center my-4">How to apply</h2>

      <ol className="list-decimal list-inside space-y-4 max-w-xl mx-auto my-8">
        <li>Copy the bulkID of your local government from the table below</li>
        <li>
          Click on the{" "}
          <Button variant="default" size="sm" asChild>
            <Link href="/auth/bulk/register">Apply</Link>
          </Button>{" "}
          button
        </li>
        <li>
          Paste the bulkID in the designated field on the application form
        </li>
        <li>Fill in all required personal details</li>
        <li>Review your information and submit the application</li>
      </ol>
      <h2 className="text-2xl font-bold text-center my-4">
        List of LGA Scholarship Contacts
      </h2>

      <Table className="rounded-md border-gray-300">
        <TableCaption>List of LGA Scholarship Contacts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r last:border-r-0 bg-primary text-white hover:bg-primary/70">
              L.G.A
            </TableHead>
            {/* <TableHead className="border-r last:border-r-0 bg-primary text-white hover:bg-primary/70">
              EMAIL
            </TableHead> */}
            <TableHead className="border-r last:border-r-0 bg-primary text-white hover:bg-primary/70">
              BULK ID
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scholarshipData.map(({ lga, email, bulkId }) => (
            <TableRow key={bulkId}>
              <TableCell>{lga}</TableCell>
              {/* <TableCell>{email}</TableCell> */}
              <TableCell>
                {bulkId}
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText(bulkId);
                    toast("Copied!", {
                      description: "BulkID copied to clipboard",
                    });
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScholarshipPage;
