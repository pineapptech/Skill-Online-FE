import { Rss } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

const Newsletter = () => {
  return (
    <section
      className="newsletter text-white"
      style={{
        background:
          "url(/images/newsletter-bg.svg) fixed no-repeat center center / cover",
      }}
    >
      <div className="container flex flex-col items-center text-center">
        <Rss className="size-20 text-neutral-400 mb-4" />
        <h2>SUBSCRIBE TO NEWSLETTER</h2>
        <p>News . Opportunities . Information . & More </p>
        <div className="flex flex-col sm:flex-row gap-4 my-4">
          <Input
            type="email"
            className="placeholder:current text-black bg-white p-6"
            placeholder="Email Address"
            size={50}
          />
          <Button
            size="lg"
            className="mx-auto w-[80%] sm:w-auto sm:h-auto border border-white/50"
          >
            Submit
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
