import { Rss } from "lucide-react";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <section className="newsletter p-8 md:px-24 text-white bg-[url(/images/newsletter-bg.svg)]">
      <div className="container flex flex-col items-center">
        <Rss className="size-20 text-neutral-400 mb-4" />
        <h2>SUBSCRIBE TO NEWSLETTER</h2>
        <p>News . Opportunities . Information . & More </p>
        <div className="flex items-stretch gap-4 my-4">
          <input
            type="email"
            className="rounded px-4 text-sm  placeholder:current focus:outline-none focus:ring-4 ring-secondary text-black"
            placeholder="Email Address"
            size={50}
          />
          <Button size="lg">Submit</Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
