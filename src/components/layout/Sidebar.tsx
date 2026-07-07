"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  ShoppingBasket,
  Users,
  SquareDashedKanban,
  LogOut,
  TableProperties
} from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteCookie } from "cookies-next";

const menuItems = [
 
  {
    name: "Product",
    icon: Store,
    href: "/",
  },
  {
    name: "Order",
    icon: ShoppingBasket,
    href: "/order",
  },
  {
    name: "Members",
    icon: Users,
    href: "/members",
  }, 
  {
    name: "Category",
    icon: TableProperties,
    href: "/category",
  }, 
  // {
  //   name: "Dashboard",
  //   icon: LayoutDashboard,
  //   href: "/dashboard",
  // },
];



const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
  try {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      deleteCookie("role");
      router.push("/sign-in");
    } catch (error: any) {
      alert(error.message || "Failed to logout");
    }
  };
  return (
    <aside className="w-64 bg-gray-50 border-r-1 border-gray-500 text-white flex flex-col h-screen sticky top-0">
      {/* Header / Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-gray-600 p-2 rounded-xl">
          <SquareDashedKanban className="w-6 h-6 text-white fill-white/20" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-gray-600 leading-tight">Mini ERP</h1>
          <p className="text-xs text-gray-500">Store Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-gray-600 text-white shadow-sm shadow-gray-300"
                  : "text-gray-500 hover:text-gray-600 hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Action */}
      <div className="px-4 pb-6 mt-auto">
        <button onClick={handleLogout} className="w-full bg-gray-600 hover:bg-[#288c5a] text-white py-3 px-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors duration-200 font-medium relative overflow-hidden group cursor-pointer">
          <div className="flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;