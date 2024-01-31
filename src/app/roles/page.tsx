"use client";
import React from "react";
import { api } from "~/trpc/react";

const Roles = () => {
  const {
    data: roles,
    refetch: refetchRoles,
    isInitialLoading: isInitialLoadingRoles,
  } = api.role.getAll.useQuery();

  if (isInitialLoadingRoles) return <div>Loading Roles...</div>;

  return (
    <main className="flex min-h-screen items-center justify-evenly bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        <h1>All roles</h1>
        {!roles?.length && <div>No roles yet</div>}
        <ul>
          {roles?.map(({ role, countUserId }) => (
            <li
              className="flex min-w-full flex-col rounded-md border-2 border-solid border-x-zinc-50 p-4"
              key={role.id}
            >
              <p>Role: {role.name}</p>
              <p className="self-end">{countUserId} user(s)</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Roles;
