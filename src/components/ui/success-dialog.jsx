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

const SuccessDialog = ({
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
        <DialogHeader className={classes.header}>
          <motion.svg
            animate="draw"
            initial="initial"
            transition={{ staggerChildren: 0.2 }}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-check-big self-center dialog-x-icon size-16 text-green-500 fill-transparent"
          >
            <motion.path
              variants={{
                draw: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 0.5 },
                },
                initial: { pathLength: 0, opacity: 0 },
              }}
              d="M21.801 10A10 10 0 1 1 17 3.335"
            />
            <motion.path
              variants={{
                draw: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 0.5 },
                },
                initial: { pathLength: 0, opacity: 0 },
              }}
              d="m9 11 3 3L22 4"
            />
          </motion.svg>

          <DialogTitle
            className={cn("self-center text-green-600", classes.title)}
          >
            {title}
          </DialogTitle>
          <DialogDescription className={cn("text-center", classes.title)}>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className={cn("text-sm", classes.body)}>{body}</div>
        <DialogFooter className={cn(classes.footer)}>
          {controls ? (
            controls
          ) : (
            <DialogClose className={classes.close} asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
