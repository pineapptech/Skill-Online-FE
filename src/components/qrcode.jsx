"use client";
import { useEffect, useRef, useState } from "react";
import Code from "qrcode";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const QRCode = ({ text, className, size }) => {
  const ref = useRef(null);
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    if (!ref.current) return;

    Code.toCanvas(ref.current, text ?? window.location.href, {
      width: size,
      height: size,
    });

    setImageLink(ref.current.toDataURL());
  }, [text, size]);

  return (
    <div
      className={cn(
        "w-fit mx-auto flex flex-col items-center gap-1",
        className
      )}
    >
      <canvas ref={ref} />
      <Button asChild>
        <a href={imageLink} download="ETSAP_QRCode.png">
          Download QRCode
        </a>
      </Button>
    </div>
  );
};

export default QRCode;
