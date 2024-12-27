"use client";
import React, { useEffect } from "react";

const Providers = ({ children }) => {
  useEffect(() => {
    // Tawk.to script
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/676df55faf5bfec1dbe2ac6c/1ig2od0h4";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  });

  return <>{children}</>;
};

export default Providers;
