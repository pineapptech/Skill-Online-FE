"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo-dark.svg";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { ExternalLinkIcon, Menu, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navlinks = [
  { label: "Home", href: "/#" },
  { label: "Courses", href: "/#courses" },
  { label: "About us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Scholarship", href: "/scholarship" },
];

const Navbar = ({ className }) => {
  const { scrollY } = useScroll();
  const [inView, setInView] = useState(true);
  const pathname = usePathname();
  const [fullUrl, setFullUrl] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 110 && inView) setInView(false);
    else if (latest <= 10 && !inView) setInView(true);
  });

  useEffect(() => {
    const handleHashChange = () => {
      setFullUrl(window.location.pathname + (window.location.hash || "#"));
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    setIsNavbarOpen(false);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  return (
    <>
      <motion.nav
        animate={{ top: inView ? 0 : 16 }}
        className={cn(
          "px-8 lg:px-24 py-4 sticky z-30 lg:mx-auto bg-background",
          !inView &&
            "md:px-8 rounded-[2rem] max-w-screen-lg mx-4 py-2 bg-background/80 shadow-md backdrop-blur-sm",
          typeof className == "function" ? className(inView) : className
        )}
        style={{ top: inView ? 0 : 16 }}
      >
        <DropdownMenu open={isNavbarOpen} onOpenChange={setIsNavbarOpen}>
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

            <DropdownMenuTrigger className="col-span-2 md:hidden justify-self-end">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="md:hidden w-screen bg-background/80 shadow-md backdrop-blur-sm p-4">
              <Nav fullUrl={fullUrl} mobile={true} />
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      </motion.nav>
      <SearchUserBanner />
    </>
  );
};

const Nav = ({ fullUrl, mobile }) => {
  const ListItemElement = mobile ? motion.create(DropdownMenuItem) : motion.li;

  return (
    <ul
      className={cn(
        "header-navlinks col-span-3 hidden md:flex items-center gap-2 md:gap-4 lg:gap-12 font-bold text-sm text-gray-600",
        mobile ? "flex flex-col w-fit mx-auto" : "col-span-2 justify-self-end"
      )}
    >
      {navlinks.map(({ label, href }) => (
        <ListItemElement
          key={label + href}
          whileHover="drawBorder"
          className="relative self-stretch focus:bg-transparent justify-center"
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
        </ListItemElement>
      ))}
      <li className="">
        <Button className="rounded-full" asChild>
          <Link href="/auth" scroll={false}>
            Get Started
          </Link>
        </Button>
      </li>
    </ul>
  );
};

const SearchUserBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-white flex items-center justify-center relative">
      <Link
        href="/user/search"
        className="hover:underline grow text-center px-4 py-2"
      >
        Click here to find your registration number
      </Link>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 hover:bg-white/20 rounded p-1 transition-colors"
        aria-label="Close banner"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Navbar;
