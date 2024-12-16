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

const ErrorDialog = ({
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
            className="lucide lucide-circle-x self-center dialog-x-icon size-16 text-red-500 fill-transparent"
          >
            <motion.circle
              variants={{
                draw: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 0.5 },
                },
                initial: { pathLength: 0, opacity: 0 },
              }}
              cx={12}
              cy={12}
              r={10}
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
              d="m15 9-6 6"
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
              d="m9 9 6 6"
            />
          </motion.svg>
          <DialogTitle
            className={cn("self-center text-red-500", classes.title)}
          >
            {title}
          </DialogTitle>
          <DialogDescription className={cn("text-center", classes.title)}>
            {description}{" "}
          </DialogDescription>
        </DialogHeader>
        <div className={cn("text-sm", classes.body)}>{body}</div>
        <DialogFooter className={cn("sm:justify-center", classes.footer)}>
          {controls ? (
            controls
          ) : (
            <DialogClose className={classes.close} asChild>
              <Button variant="outline">Try again</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
