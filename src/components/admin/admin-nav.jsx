"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Info, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Info", href: "/admin", icon: <Info /> },
  { name: "Users", href: "/admin/users", icon: <Users /> },
];
const AdminNav = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex justify-center gap-4 my-4 bg-gradient-to-r from-primary/5 p-4">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={cn(
                "flex flex-col p-4  min-w-20 border border-primary rounded-md items-center gap-2 hover:scale-105 hover:bg-primary/70 hover:border-transparent hover:text-white transition-all duration-300",
                link.href === pathname && "bg-primary text-white"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;
