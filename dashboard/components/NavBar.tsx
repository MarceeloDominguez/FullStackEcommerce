"use client";
import { House, ListOrdered, LogIn, LogOut, Menu } from "lucide-react";
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
          <SheetContent side="left" className="bg-slate-50 p-10">
            <SheetDescription>
              <nav className="space-y-4">
                <Link
                  href="/"
                  className="text-sm font-medium bg-slate-50 hover:bg-slate-900 hover:text-white transition-colors duration-300 flex gap-2 items-center p-2 rounded-sm"
                >
                  <House size={18} />
                  Home
                </Link>
                <Link
                  href="/orders"
                  className="text-sm font-medium bg-slate-50 hover:bg-slate-900 hover:text-white transition-colors duration-300 flex gap-2 items-center p-2 rounded-sm"
                >
                  <ListOrdered size={18} />
                  Orders
                </Link>
              </nav>
            </SheetDescription>
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
