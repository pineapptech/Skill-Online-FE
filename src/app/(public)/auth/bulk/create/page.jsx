import React from "react";
import BulkCreationForm from "@/components/auth/bulk-creation-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BulkCreation = () => {
  return (
    <>
      <BulkCreationForm />
      <Dialog defaultOpen={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-500 text-center">
              Important
            </DialogTitle>
          </DialogHeader>
          <p>
            This registration is for admins only. If you&apos;re a regular user,
            use the single registration link or you can register under an admin
            using the bulk ID
          </p>
          <DialogFooter className="sm:justify-between gap-4">
            <Button variant="outline" asChild>
              <DialogClose>Continue to ADMIN Creation</DialogClose>
            </Button>
            <Button asChild>
              <Link href="/auth/">Take Me Back</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BulkCreation;
