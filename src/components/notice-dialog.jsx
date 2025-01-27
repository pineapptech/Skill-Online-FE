"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const NoticeDialog = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const noticeDialogCount =
        JSON.parse(localStorage.getItem("noticeDialogCount")) ?? 0;

      if (noticeDialogCount < 2) {
        setOpen(true);
        localStorage.setItem("noticeDialogCount", `${noticeDialogCount + 1}`);
      }
    } catch {
      localStorage.setItem("noticeDialogCount", "1");
    }
  }, []);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">
              Important Notice
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-gray-700">
            Due to the growing requests we are receiving to extend the
            registration date to allow more Nigerians apply for this program, we
            are happy to inform you that the Board of Partners &#40;Skillonline,
            ACCREDIA, CIRPS, INTERTEK, and IBI&#41; have approved the extension
            of the registration to <strong>March 2, 2025</strong>. Classes will
            now resume on <strong>March 3, 2025</strong>.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoticeDialog;
