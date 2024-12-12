"use client";
import React from "react";
import { IconMailFilled, IconMapPinFilled } from "@tabler/icons-react";

const ContactSection = () => {
  return (
    <section className="contact bg-neutral-100 p-8">
      <div className="container mx-auto">
        <h2 className="my-0">Get In Touch With Us</h2>
        <p className="mb-8">
          Connecting Beyond Boundaries: Reach Out and Get in Touch with Us
          Today.
        </p>

        <div className="flex justify-between gap-6">
          <div className="info basis-2/5 space-y-4 [&_p]:mb-2">
            <div className="email-section flex gap-2">
              <IconMailFilled className="text-primary size-6" />
              <div className="email-info">
                <h3 className="text-primary m-0">Email Address</h3>
                <p>communitymanager@etsap.com</p>
                <p>enugutechhub@enugustate.gov.ng</p>
              </div>
            </div>
            <div className="location-section flex gap-4">
              <IconMapPinFilled className="text-primary size-9" />
              <div className="location-info">
                <h3 className="text-primary m-0">Location</h3>
                <p>
                  International Bioresearch Institute Nigerian office, along
                  Ugwogo, Enugu state, Nigeria
                </p>
                <p>
                  Enugu State Technology Hub NO 2 Upper Presidential road,
                  Independence Layout Enugu, Nigeria
                </p>
              </div>
            </div>
          </div>
          <form className="contact-form basis-2/5 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-neutral-200 rounded-md placeholder:text-current w-full p-4"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-neutral-200 rounded-md placeholder:text-current w-full p-4"
            />
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              className="bg-neutral-200 rounded-md placeholder:text-current w-full p-4"
            ></textarea>
            <button className="p-2 rounded-full bg-primary text-white hover:bg-primary/90 active:bg-primary/80">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
