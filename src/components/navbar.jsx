"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo-dark.svg";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

const navlinks = [
  { label: "Home", href: "/#" },
  { label: "Courses", href: "/#courses" },
  { label: "About us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = ({ className }) => {
  const { scrollY } = useScroll();
  const [inView, setInView] = useState(true);
  const [fullUrl, setFullUrl] = useState(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 110 && inView) setInView(false);
    else if (latest <= 110 && !inView) setInView(true);
  });

  useEffect(() => {
    const handleHashChange = () => {
      setFullUrl(window.location.pathname + (window.location.hash || "#"));
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <motion.nav
      animate={{ top: inView ? 0 : 16 }}
      className={cn(
        "px-8 md:px-24 py-4 sticky z-30 mx-auto",
        !inView &&
          "md:px-8 rounded-full max-w-[1100px] py-2 bg-primary-foreground/80 shadow-md backdrop-blur-sm",
        typeof className == "function" ? className(inView) : className
      )}
      style={{ top: inView ? 0 : 16 }}
    >
      <div className="container flex justify-between items-center  mx-auto">
        <Link href="/">
          <Image
            src={logo}
            alt="ETSAP Logo"
            className="logo w-20"
            width={92}
            height={52}
          />
        </Link>
        <ul className="flex items-center gap-2 md:gap-4 lg:gap-12 font-bold text-sm text-gray-600">
          {navlinks.map(({ label, href }) => (
            <motion.li
              key={label + href}
              whileHover="drawBorder"
              className="relative"
            >
              <a
                className={cn(
                  "p-2 border-b-2 border-transparent",
                  fullUrl == href && "text-secondary"
                )}
                href={href}
              >
                {label}
              </a>
              <motion.div
                variants={{
                  drawBorder: { width: "100%", left: 0 },
                }}
                style={
                  fullUrl == href
                    ? { width: "100%", left: 0 }
                    : { width: 0, left: "50%" }
                }
                className={cn("absolute h-0.5 bg-current top-full")}
              ></motion.div>
            </motion.li>
          ))}
          {!fullUrl?.startsWith("/register") && (
            <li>
              <Button className="rounded-full" asChild>
                <Link href="/register" scroll={false}>
                  Apply Now
                </Link>
              </Button>
            </li>
          )}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
