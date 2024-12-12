"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/logo-dark.svg";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navlinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "#courses" },
  { label: "About us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [inView, setInView] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 110 && inView) setInView(false);
    if (latest < 110 && !inView) setInView(true);
  });

  useEffect(() => {
    if (pathname.hash) {
      const el = document.querySelector(pathname.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <motion.nav
      // animate={{ top: inView ? 0 : 16 }}
      className={cn(
        "px-8 md:px-24 py-4 sticky z-30",
        !inView &&
          "md:px-8 rounded-full max-w-[900px] mx-auto py-2 bg-primary-foreground/80 border-primary border backdrop-blur-sm"
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
              <Link
                className={cn(
                  "p-2 border-b-2 border-transparent",
                  pathname.hash == href && "text-secondary"
                )}
                href={href}
              >
                {label}
              </Link>
              <motion.div
                variants={{
                  drawBorder: { width: "100%", left: 0 },
                }}
                style={
                  pathname.hash == href
                    ? { width: "100%", left: 0 }
                    : { width: 0, left: "50%" }
                }
                className={cn("absolute h-0.5 bg-current top-full")}
              ></motion.div>
            </motion.li>
          ))}
          {!pathname?.pathname?.startsWith("/register") && (
            <li>
              <Button className="rounded-full" asChild>
                <Link href="/register">Register Now</Link>
              </Button>
            </li>
          )}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
