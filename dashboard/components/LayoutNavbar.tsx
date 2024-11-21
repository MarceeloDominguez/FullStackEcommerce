"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const NavBar = dynamic(() => import("./NavBar"), { ssr: false });

export default function LayoutNavbar() {
  const pathname = usePathname();

  return <>{!pathname.includes("/auth") && <NavBar />}</>;
}
