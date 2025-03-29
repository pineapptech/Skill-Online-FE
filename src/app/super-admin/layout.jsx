"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorDialog from "@/components/ui/error-dialog";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Baby, Eye, EyeOff, HandPlatter } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "All Single Users",
    href: "/super-admin/single-users",
    icon: <Baby />,
  },
  {
    name: "All Bulk Users",
    href: "/super-admin/bulk-users",
    icon: <HandPlatter />,
  },
];

const SuperAdminLayout = ({ children }) => {
  const [passphrase, setPassphrase] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPassphraseCorrect, setIsPassphraseCorrect] = useState(null);
  const pathname = usePathname();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (passphrase === "Admin@etsapafrica") {
      setIsPassphraseCorrect(true);
    } else {
      setIsPassphraseCorrect(false);
    }
  };

  if (isPassphraseCorrect) {
    return (
      <>
        <Navbar />
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
        <div className="px-4">{children}</div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Enter Passphrase To Continue
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-2 relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="w-full py-6 border-0 shadow-none rounded-none focus-visible:ring-0 border-b border-neutral-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>

      <ErrorDialog
        open={isPassphraseCorrect === false}
        onOpenChange={() => {
          setIsPassphraseCorrect(null);
        }}
        title="Error"
        description="Invalid passphrase. Please try again."
        classes={{ body: "text-center" }}
      />
    </div>
  );
};

export default SuperAdminLayout;
