"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const positions = {
  left: {
    container: (show) =>
      cn(
        "top-1/2 -translate-y-1/2 left-0 rounded-e-lg",
        !show && "-translate-x-full"
      ),
    control: (show) =>
      cn(
        "left-full top-1/2 -translate-y-1/2 rounded-e-lg h-2/3",
        !show && "[&_svg]:rotate-180"
      ),
  },
  right: {
    container: (show) =>
      cn(
        "top-1/2 -translate-y-1/2 right-0 rounded-s-lg",
        !show && "translate-x-full"
      ),
    control: (show) =>
      cn(
        "right-full top-1/2 -translate-y-1/2 rounded-s-lg h-2/3",
        show && "[&_svg]:rotate-180"
      ),
  },
  bottom: {
    container: (show) =>
      cn(
        "left-1/2 -translate-x-1/2 bottom-0 rounded-t-lg",
        !show && "translate-y-full"
      ),
    control: (show) =>
      cn(
        "bottom-full left-1/2 -translate-x-1/2 rounded-t-lg w-2/3",
        !show ? "[&_svg]:rotate-90" : "[&_svg]:-rotate-90"
      ),
  },
  top: {
    container: (show) =>
      cn(
        "left-1/2 -translate-x-1/2 top-0 rounded-b-lg",
        !show && "-translate-y-full"
      ),
    control: (show) =>
      cn(
        "top-full left-1/2 -translate-x-1/2 rounded-b-lg w-2/3",
        show ? "[&_svg]:rotate-90" : "[&_svg]:-rotate-90"
      ),
  },
};

const GoogleTranslate = ({ position = "left" }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let hiddenTimer = null;

    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
      hiddenTimer = setTimeout(() => setShow(false), 1000);
    };

    return () => clearTimeout(hiddenTimer);
  });

  const translateHiddenText = (
    <div
      style={{
        writingMode: ["left", "right"].includes(position)
          ? "vertical-rl"
          : "horizontal-tb",
      }}
      className="text-sm"
    >
      Translate
    </div>
  );

  return (
    <div
      className={cn(
        "fixed p-2 bg-black/80 border text-white border-white z-40 backdrop-blur-sm min-h-32 flex flex-col items-center justify-center transition-transform duration-500",
        positions[position].container(show)
      )}
    >
      <button
        className={cn(
          "control absolute bg-inherit flex justify-center items-center backdrop-blur-sm",
          positions[position].control(show),
          ["top", "bottom"].includes(position) && "flex-col"
        )}
        onClick={() => setShow(!show)}
      >
        {!show && ["left", "top"].includes(position) && translateHiddenText}
        <ChevronLeft className="transition-transform duration-500" />
        {!show && ["right", "bottom"].includes(position) && translateHiddenText}
      </button>
      <Script
        type="text/javascript"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
      Translate this page
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
