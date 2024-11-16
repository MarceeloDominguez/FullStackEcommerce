import { House, ListOrdered } from "lucide-react";
import Link from "next/link";

export default function Aside() {
  return (
    <aside className="hidden lg:flex lg:w-44 lg:flex-col bg-white p-4 fixed h-full lg:mt-12">
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
    </aside>
  );
}
