"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { motion } from "motion/react";

const LoadingDialog = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
  description,
  title,
  body,
  classes = "",
  controls,
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      className={typeof classes === "string" ? classes : classes.main}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={classes.content}>
        <DialogHeader className={cn("text-secondary", classes.header)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            className="size-24 mx-auto"
          >
            <circle cx={18} cy={12} r={0} fill="currentColor">
              <animate
                attributeName="r"
                begin={0.67}
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
              ></animate>
            </circle>
            <circle cx={12} cy={12} r={0} fill="currentColor">
              <animate
                attributeName="r"
                begin={0.33}
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
              ></animate>
            </circle>
            <circle cx={6} cy={12} r={0} fill="currentColor">
              <animate
                attributeName="r"
                begin={0}
                calcMode="spline"
                dur="1.5s"
                keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                repeatCount="indefinite"
                values="0;2;0;0"
              ></animate>
            </circle>
          </svg>
          <DialogTitle className={cn("text-center", classes.title)}>
            {title ?? "Loading..."}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
      <DialogFooter>{controls}</DialogFooter>
    </Dialog>
  );
};

export default LoadingDialog;
