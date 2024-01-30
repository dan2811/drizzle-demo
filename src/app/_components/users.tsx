"use client";

import React from "react";
import { UsersList } from "./list-user";
import { CreateUser } from "./create-user";
import { api } from "~/trpc/react";

export const Users = () => {
  const {
    data: users,
    isFetched: isUsersFetched,
    refetch: refetchUsers,
  } = api.user.getUsers.useQuery();

  const mutateUserDelete = api.user.delete.useMutation;

  return (
    <div className="flex w-full justify-evenly">
      <CreateUser refetchUsers={refetchUsers} />
      <UsersList
        users={users}
        isUsersFetched={isUsersFetched}
        refetchUsers={refetchUsers}
        mutateUserDelete={mutateUserDelete}
      />
    </div>
  );
};
