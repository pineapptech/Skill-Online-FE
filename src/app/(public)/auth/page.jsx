import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackagePlus, User, Users, Workflow } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthManager = () => {
  return (
    <div className="flex gap-8 justify-center flex-wrap py-10">
      <LinkCard
        title="Register under a bulk/group"
        link="/auth/bulk/register"
        icon={<Users />}
      />
      <LinkCard
        title="Register as a single user"
        link="/auth/register"
        icon={<User />}
      />
      <LinkCard
        title="Continue your application"
        link="/auth/payment"
        icon={<Workflow />}
      />
      <LinkCard
        title="Login/Create a bulk"
        link="/auth/bulk/create"
        icon={<PackagePlus />}
      />
    </div>
  );
};

const LinkCard = ({ title, link, icon }) => {
  return (
    <Link href={link} className="block w-44">
      <Card className="size-full text-center hover:shadow-lg hover:bg-primary/10 hover:scale-105 transition-all duration-300">
        <CardHeader className="flex items-center gap-2 [&_svg]:size-16">
          <CardTitle>{icon}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AuthManager;
