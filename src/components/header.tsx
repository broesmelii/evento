"use client";

import React, { act } from "react";
import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Events",
    href: "/events/all",
  },
];

export default function Header() {
  const activePathname = usePathname();
  return (
    <header
      className="flex justify-between items-center border-b border-white/10 h-14
        px-3 sm:px-9"
    >
      <Link href="/">
        <Logo />
      </Link>
      <nav className="h-full">
        <ul className="flex gap-x-6 text-sm h-full">
          {routes.map((route) => (
            <li
              key={route.href}
              className={cn(
                "hover:text-white transition relative flex items-center",
                {
                  "text-white": activePathname === route.href,
                  "text-white/50": activePathname !== route.href,
                }
              )}
            >
              <Link href={route.href}>{route.name}</Link>
              {activePathname === route.href && (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent h-1 w-full absolute bottom-0"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
