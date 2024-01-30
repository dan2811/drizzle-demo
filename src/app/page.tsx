import { unstable_noStore as noStore } from "next/cache";
import { CreateUser } from "~/app/_components/create-user";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen items-center justify-evenly bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <CreateUser />
      <UsersList />
    </main>
  );
}

const UsersList = async () => {
  const users = await api.user.getUsers.query();
  return (
    <div className="flex w-full max-w-xs flex-col gap-y-7">
      <h2 className="text-4xl">All user</h2>
      {users.map(({ id, name, age, role }) => (
        <div
          key={id}
          className="flex flex-col rounded-md border-2 border-solid border-x-zinc-50 p-4"
        >
          <span>ID: {id}</span>
          <span>Name: {name}</span>
          <span>Age: {age}</span>
          <span>Role: {role.name}</span>
        </div>
      ))}
    </div>
  );
};
