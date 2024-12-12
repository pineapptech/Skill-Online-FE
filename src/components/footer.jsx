import {
  IconBrandFacebook,
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

const links = [
  { name: "Home", href: "#" },
  { name: "Our Service", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact", href: "#" },
];

const socialLinks = [
  { icon: <IconBrandFacebook />, href: "#" },
  { icon: <IconBrandX />, href: "#" },
  { icon: <IconBrandInstagram />, href: "#" },
];
const Footer = () => {
  return (
    <footer className="p-8 pb-4 flex flex-col gap-8 items-center">
      <ul className="links flex divide-x-2 divide-current">
        {links.map((link) => (
          <motion.li
            key={link.name}
            className="relative px-4"
            whileHover="show"
            initial="hide"
          >
            <Link href={link.href}>{link.name}</Link>
            <motion.div
              variants={{ show: { scaleX: 0.7 }, hide: { scaleX: 0 } }}
              className="absolute top-full left-0 w-full h-0.5 bg-current"
            ></motion.div>
          </motion.li>
        ))}
      </ul>

      <ul className="social-links flex gap-4">
        {socialLinks.map((link, index) => (
          <motion.li
            key={link.href + index}
            whileHover={{ y: -3 }}
            className="p-2 rounded-full bg-neutral-200 text-blue-400"
          >
            <Link href={link.href}>{link.icon}</Link>
          </motion.li>
        ))}
      </ul>

      <p>
        &copy; 2024 Pineapp solutions limited, a startup with Enugu State
        Technology Hub{" "}
      </p>
    </footer>
  );
};

export default Footer;
