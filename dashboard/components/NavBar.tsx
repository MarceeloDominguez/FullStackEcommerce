"use client";
import { LogIn, LogOut, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/authStore";
import { Button } from "./ui/button";

export default function NavBar() {
  const router = useRouter();
  const { token, logout } = useAuth();

  const isLoggedIn = !!token;

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="fixed w-full h-12 top-0 left-0 flex items-center justify-between px-4 bg-white">
      <div className="flex gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="lg:hidden flex" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetDescription>Hola!</SheetDescription>
          </SheetContent>
        </Sheet>
        <Link href={"/"} className="text-lg font-bold">
          E-commerce
        </Link>
      </div>
      {isLoggedIn ? (
        <Button variant="secondary" onClick={handleLogout}>
          <LogOut />
          Logout
        </Button>
      ) : (
        <Link href={"/auth/login"}>
          <Button variant="secondary">
            <LogIn />
            Login
          </Button>
        </Link>
      )}
    </nav>
  );
}
