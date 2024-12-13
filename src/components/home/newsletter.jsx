import { Rss } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="newsletter p-8 text-white bg-[url(/images/newsletter-bg.svg)]">
      <div className="container flex flex-col items-center">
        <Rss className="size-20 text-neutral-400 mb-4" />
        <h2>SUBSCRIBE TO NEWSLETTER</h2>
        <p>News . Opportunities . Information . & More </p>
        <div className="flex items-center gap-4 my-4">
          <input
            type="email"
            className="rounded p-3 text-base placeholder:current focus:outline-none focus:ring-4 ring-secondary text-black"
            placeholder="Email Address"
            size={50}
          />
          <button className="rounded-full p-3 px-8 text-white bg-primary hover:bg-primary/80 active:bg-primary/70">
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
