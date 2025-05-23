"use client";
import { Bell, LogOut, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import api from "@/lib/axios";
import JoinClass from "./join-class";
import ClassesList from "./classes-list";

const StudentSidebar = () => {
  const router = useRouter();
  const logout = async () => {
    console.log("clicked");

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
            <JoinClass />

            <ClassesList />
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

export default StudentSidebar;
