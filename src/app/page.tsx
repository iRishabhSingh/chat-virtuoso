import Logout from "@/components/logout";
import { ModeToggle } from "@/components/mode-toggle";
import UserSettings from "@/components/UserSettings";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div>ChatVirtuoso</div>
      <UserSettings />
      <ModeToggle />
      <Logout />
    </main>
  );
}
