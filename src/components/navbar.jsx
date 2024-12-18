"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo-dark.svg";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Menu } from "lucide-react";

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
        "px-8 lg:px-24 py-4 sticky z-30 mx-4 lg:mx-auto",
        !inView &&
          "md:px-8 rounded-[2rem] max-w-screen-lg py-2 bg-primary-foreground/80 shadow-md backdrop-blur-sm",
        typeof className == "function" ? className(inView) : className
      )}
      style={{ top: inView ? 0 : 16 }}
    >
      <Collapsible>
        <div className="container grid grid-cols-3 justify-items-start items-center mx-auto">
          <Link href="/">
            <Image
              src={logo}
              alt="ETSAP Logo"
              className="logo w-20"
              width={92}
              height={52}
            />
          </Link>

          <Nav fullUrl={fullUrl} mobile={false} />

          <CollapsibleTrigger className="col-span-2 md:hidden justify-self-end">
            <Menu />
          </CollapsibleTrigger>
          <CollapsibleContent className="row-start-2 col-end-3 md:hidden justify-self-stretch">
            <Nav fullUrl={fullUrl} mobile={true} />
          </CollapsibleContent>
        </div>
      </Collapsible>
    </motion.nav>
  );
};

const Nav = ({ fullUrl, mobile }) => {
  return (
    <ul
      className={cn(
        "col-span-3  hidden md:flex items-center gap-2 md:gap-4 lg:gap-12 font-bold text-sm text-gray-600",
        mobile ? "flex flex-col" : "col-span-2 justify-self-end"
      )}
    >
      {navlinks.map(({ label, href }) => (
        <motion.li
          key={label + href}
          whileHover="drawBorder"
          className="relative self-stretch"
        >
          <a
            className={cn(
              "p-2 border-b-2 border-transparent block text-center whitespace-nowrap",
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
      {!fullUrl?.startsWith("/auth") && (
        <li className="">
          <Button className="rounded-full">
            <Link href="/auth/register" scroll={false}>
              Apply Now
            </Link>
          </Button>
        </li>
      )}
    </ul>
  );
};

export default Navbar;
