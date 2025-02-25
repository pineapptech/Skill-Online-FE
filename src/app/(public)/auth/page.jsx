import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackagePlus, User, Users, Workflow } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthManager = () => {
  return (
    <div className="flex gap-8 justify-center flex-wrap py-10">
      <LinkCard
        title="Apply for a course"
        link="/auth/register"
        icon={<User />}
      />
      <LinkCard
        title="Register under a bulk admin"
        link="/auth/bulk/register"
        icon={<Users />}
      />
      <LinkCard
        title="Become a bulk admin"
        link="/auth/bulk/create"
        icon={<PackagePlus />}
      />
      <LinkCard
        title="Registered before? Continue to payment"
        link="/auth/payment"
        icon={<Workflow />}
      />
    </div>
  );
};

const LinkCard = ({ title, link, icon }) => {
  return (
    <Link href={link} className="block w-44">
      <div className="flex flex-col items-center size-full text-center p-6 shadow rounded-lg border border-primary/5 hover:shadow-lg hover:bg-primary/5 hover:scale-105 transition-all duration-300">
        <div className="[&_svg]:size-20 font-bold py-2">{icon}</div>
        <h3 className="my-auto">{title}</h3>
      </div>
    </Link>
  );
};

export default AuthManager;
