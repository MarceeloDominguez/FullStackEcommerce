"use client";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function LayoutNavbar() {
  const pathname = usePathname();

  return <>{!pathname.includes("/auth") && <NavBar />}</>;
}
