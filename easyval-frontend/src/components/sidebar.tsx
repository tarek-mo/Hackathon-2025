"use client";
import { Bell, Book, Home, LogOut, Settings, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import CreateAssignmentDialog from "./create-assignment-dialog";
import api from "@/lib/axios";

const Sidebar = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");

      if (response.data) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.log("error logout", error);
    }
  };
  const pathname = usePathname();
  return (
    <div className="hidden border-r bg-muted/40 md:block md:sticky md:h-screen md:left-0 md:top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6" />
            <span className="">EasyVal</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <CreateAssignmentDialog />

            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
              } flex items-center gap-3 mt-4 rounded-lg px-3 py-2 transition-all hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/"
              className={`${
                pathname === "/modules"
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
              } flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`}
            >
              <Book className="h-4 w-4" />
              Modules
            </Link>

            <Link
              href="/settings"
              className={`${
                pathname.startsWith("/settings")
                  ? "text-primary bg-muted"
                  : "text-muted-foreground"
              } flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto pb-4">
          <div className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Button
              onClick={logout}
              variant="destructive"
              className="flex gap-3 items-center"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
