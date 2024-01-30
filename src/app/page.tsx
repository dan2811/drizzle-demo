import { unstable_noStore as noStore } from "next/cache";
import { Toaster } from "react-hot-toast";
import { Users } from "./_components/users";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen items-center justify-evenly bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Users />
      <Toaster />
    </main>
  );
}
