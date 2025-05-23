"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Home,
  LineChart,
  LogOut,
  Menu,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Store,
  Truck,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";

const MobileSidebar = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col overflow-auto">
        <nav className="grid gap-2 text-lg font-medium p-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Shield className="h-6 w-6" />
            <span className="sr-only">EasyVal</span>
          </Link>
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <Home className="h-5 w-5" />
            Overview
          </Link>
          <Link
            href="/orders"
            className={`${
              pathname.startsWith("/orders")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </Link>
          <Link
            href="/categories"
            className={`${
              pathname.startsWith("/categories")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <HandPlatter className="h-5 w-5" />
            Categories
          </Link>
          <Link
            href="/products"
            className={`${
              pathname.startsWith("/products")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/accounts"
            className={`${
              pathname.startsWith("/accounts")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <Users className="h-5 w-5" />
            Accounts
          </Link>
          <Link
            href="/coupons"
            className={`${
              pathname.startsWith("/coupons")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <LineChart className="h-5 w-5" />
            Coupons
          </Link>
          <Link
            href="/delivery"
            className={`${
              pathname.startsWith("/delivery")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <Truck className="h-5 w-5" />
            Delivery
          </Link>
          <Link
            href="/payments"
            className={`${
              pathname.startsWith("/payments")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <Wallet className="h-5 w-5" />
            Payments
          </Link>
          <Link
            href="/branches"
            className={`${
              pathname.startsWith("/branches")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <Store className="h-5 w-5" />
            Branches
          </Link>
          <DropdownMenuSeparator />
          <Link
            href="/settings"
            className={`${
              pathname.startsWith("/settings")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link
            href="/profile"
            className={`${
              pathname.startsWith("/profile")
                ? "text-foreground bg-muted"
                : "text-muted-foreground"
            } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground`}
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/login"
            className="text-destructive mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
