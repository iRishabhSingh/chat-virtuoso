import Logout from "@/components/logout";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div>ChatVirtuoso</div>
      <ModeToggle />
      <Logout />
    </main>
  );
}
