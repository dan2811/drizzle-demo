import { unstable_noStore as noStore } from "next/cache";
import { Toaster } from "react-hot-toast";
import { CreateUser } from "~/app/_components/create-user";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen items-center justify-evenly bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <CreateUser />
      <UsersList />
      <Toaster />
    </main>
  );
}

const UsersList = async () => {
  const users = await api.user.getUsers.query();
  return (
    <div className="flex w-full max-w-xs flex-col gap-y-7">
      <h2 className="text-4xl">All users</h2>
      {users.length === 0 && <span>No users yet</span>}
      {users.map(({ id, name, age, role }) => (
        <div className="flex min-w-full rounded-md border-2 border-solid border-x-zinc-50 p-4">
          <div key={id} className="flex flex-grow flex-col pr-4">
            <span>ID: {id}</span>
            <span>Name: {name}</span>
            <span>Age: {age}</span>
            <span>Role: {role.name}</span>
          </div>
          <button className="h-fit rounded-md bg-pink-700 p-2 text-white">
            Delete{" "}
          </button>
        </div>
      ))}
    </div>
  );
};
