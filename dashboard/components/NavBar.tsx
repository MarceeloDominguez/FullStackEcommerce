import { LogIn, Menu } from "lucide-react";
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

export default function NavBar() {
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
      <LogIn />
    </nav>
  );
}
