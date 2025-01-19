import Link from "next/link";
import React from "react";

const routes = [
  { path: "/terms-conditions", label: "Terms & Conditions" },
  { path: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto flex items-center justify-between h-10 border-t border-white/10 px-3 sm:px-9 text-xs text-white/25">
      <small className="text-xs">
        Created from &copy;ByteGrad course for portfolio use{" "}
      </small>
      <ul className="flex gap-4 sm:gap-8">
        {routes.map((route) => (
          <li key={route.path}>
            <Link href={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
