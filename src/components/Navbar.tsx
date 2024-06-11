"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();

  const LINKS = [
    { name: "Identify", link: "/" },
    { name: "My Products", link: "/Products" },
    { name: "Profile", link: "/Profile" },
  ];

  return (
    <>
      <nav className="flex justify-center ">
        <div className="border p-1 inline-flex space-x-2 rounded-lg ">
          {LINKS.map((link) => (
            <Link
              href={link.link}
              key={link.name}
              className={
                (pathname === link.link ? "bg-active" : "") +
                "  p-2 rounded-lg transition-all hover:font-bold"
              }
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
