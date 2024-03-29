"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/trpc/react";

interface CreateUserProps {
  refetchUsers: () => void;
}

export function CreateUser({ refetchUsers }: CreateUserProps) {
  const { data: roles } = api.role.getAll.useQuery();

  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [roleId, setRoleId] = useState<number | string>("default");

  const createUser = api.user.create.useMutation({
    onSuccess: () => {
      refetchUsers();
      setName("");
      setAge(18);
      setRoleId("default");
      toast.success("User created!");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name || typeof name !== "string") {
          toast.error("Please enter a valid name");
          return;
        }
        if (!roleId || typeof roleId !== "number") {
          toast.error("Please select a role");
          return;
        }
        createUser.mutate({ name, age, roleId });
      }}
      className="flex flex-col gap-2"
    >
      <h2 className="text-4xl">New user</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="number"
        min={18}
        max={120}
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <select
        className="rounded-full px-4 py-2 text-black"
        name="Role"
        onChange={(e) => setRoleId(parseInt(e.target.value))}
        value={roleId ?? undefined}
      >
        <option value={"default"} key="default-select-param" disabled>
          Select a role
        </option>
        {roles?.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createUser.isLoading}
      >
        {createUser.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
