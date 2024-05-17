import Sidebar from "@/components/SideBar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Sidebar className="hidden md:flex" />
    </main>
  );
}
