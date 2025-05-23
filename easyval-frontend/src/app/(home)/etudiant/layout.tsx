import Navbar from "@/components/navbar";
import StudentSidebar from "@/components/student-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <StudentSidebar />
      <div className="flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
