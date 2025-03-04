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
        setTimeout(() => setOpen(true), 5000);
        localStorage.setItem("noticeDialogCount", `${noticeDialogCount + 1}`);
      }
    } catch {
      localStorage.setItem("noticeDialogCount", "1");
    }
  }, []);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">
              Important Notice
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm text-gray-700">
            {/* Due to the growing requests we are receiving to extend the
            registration date to allow more Nigerians apply for this program, we
            are happy to inform you that the Board of Partners &#40;Skillonline,
            ACCREDIA, CIRPS, INTERTEK, and IBI&#41; have approved the extension
            of the registration to <strong>March 2, 2025</strong>. Classes will
            now resume on <strong>March 3, 2025</strong>. */}
            Due to the growing requests we have received to extend the
            registration deadline, we are pleased to inform you that the Board
            of Partners &#40;Skillonline, ACCREDIA, CIRPS, INTERTEK, and IBI&41;
            has approved an extended registration period. Although the initial
            deadline was <strong>March 1, 2025</strong>, orientation sessions
            will now take place over the next four weeks, with one orientation
            per week. During this period,{" "}
            <strong>registration will remain open</strong> until the four weeks
            conclude. Classes will officially begin after the orientation phase.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoticeDialog;
