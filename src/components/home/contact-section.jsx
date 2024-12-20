"use client";
import React from "react";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Input } from "../ui/input";

const formAnimation = {
  initial: { x: 30, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
};

const MotionButton = motion.create(Button);
const ContactSection = () => {
  return (
    <section id="contact" className="bg-neutral-100">
      <div className="container mx-auto">
        <h2 className="my-0">Get In Touch With Us</h2>
        <p className="mb-8">
          Connecting Beyond Boundaries: Reach Out and Get in Touch with Us
          Today.
        </p>

        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="info basis-2/5 space-y-4 [&_p]:mb-2 text-sm sm:text-base">
            <div className="email-section flex gap-2">
              <Mail className="text-primary shrink-0 mt-px" />
              <div className="email-info text-sm sm:text-base">
                <h3 className="text-primary m-0">Email Address</h3>
                <p>emergingtechskill@gmail.com</p>
                <p>enugutechhub@enugustate.gov.ng</p>
              </div>
            </div>
            <div className="location-section flex gap-4">
              <MapPin className="text-primary shrink-0 mt-px" />
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
          <hr className="border-primary md:hidden" />
          <motion.form
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.3, staggerChildren: 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="contact-form basis-2/5 flex flex-col gap-4 overflow-x-hidden"
          >
            <motion.input
              variants={formAnimation}
              type="text"
              placeholder="Full Name"
              className="bg-neutral-200 rounded-md placeholder:text-current w-full p-4 outline-none"
            />
            <motion.input
              variants={formAnimation}
              type="email"
              placeholder="Email Address"
              className="bg-neutral-200 rounded-md placeholder:text-current w-full p-4 outline-none"
            />
            <motion.textarea
              variants={formAnimation}
              name="message"
              id="message"
              placeholder="Message"
              className="bg-neutral-200 rounded-md placeholder:text-current w-full p-4 outline-none"
            ></motion.textarea>
            <MotionButton variants={formAnimation} size="lg">
              Submit
            </MotionButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
