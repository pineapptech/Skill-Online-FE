import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const UserNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <Image
        src="/images/user-not-found.svg"
        alt="User Not Found"
        width={3000}
        height={2000}
        className="w-72 mt-6"
      />
      <p className="text-xl text-gray-600 mt-2">
        The user you&apos;re looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/" className="">
          Go Back Home
        </Link>
      </Button>
    </div>
  );
};

export default UserNotFound;
