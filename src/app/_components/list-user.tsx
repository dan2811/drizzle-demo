"use client";
import { InferSelectModel } from "drizzle-orm";
import toast from "react-hot-toast";
import { users, roles, userRelations } from "~/server/db/schema";
import { api } from "~/trpc/react";

type Role = typeof roles.$inferSelect;

type UsersWithRole = InferSelectModel<typeof users> & {
  role: Role;
};

interface UsersListProps {
  users: UsersWithRole[] | undefined;
  isUsersFetched: boolean;
  mutateUserDelete: typeof api.user.delete.useMutation;
  refetchUsers: () => void;
}

export const UsersList = ({
  users,
  isUsersFetched,
  mutateUserDelete,
  refetchUsers,
}: UsersListProps) => {
  const { mutateAsync: deleteUser } = mutateUserDelete();

  if (!isUsersFetched) return <span>Loading...</span>;
  return (
    <div className="flex w-full max-w-xs flex-col gap-y-7">
      <h2 className="text-4xl">All users</h2>
      {users?.length === 0 && <span>No users yet</span>}
      {users?.map(({ id, name, age, role }) => (
        <div
          key={id}
          className="flex min-w-full rounded-md border-2 border-solid border-x-zinc-50 p-4"
        >
          <div className="flex flex-grow flex-col pr-4">
            <span>ID: {id}</span>
            <span>Name: {name}</span>
            <span>Age: {age}</span>
            <span>Role: {role.name}</span>
          </div>
          <button
            className="h-fit rounded-md bg-pink-700 p-2 text-white"
            onClick={() =>
              void deleteUser(
                { userId: id },
                {
                  onSuccess: () => {
                    refetchUsers();
                    toast.success("User deleted!");
                  },
                },
              )
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
