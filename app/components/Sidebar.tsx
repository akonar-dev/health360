"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname,"path")

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Clients", path: "/clients" },
    { name: "Check-ins", path: "/checkins" },
  ];

  return (
    <div className="w-64 bg-white shadow-md p-5">
      <h1 className="text-xl text-black font-bold mb-6">Health Coach</h1>

      <nav className="space-y-4 text-black">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block p-2 rounded ${
              pathname === item.path
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}