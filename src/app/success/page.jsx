import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      Payment successful
      <Link href="/" className="underline">
        Go go homepage
      </Link>
    </div>
  );
};

export default page;
