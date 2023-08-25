"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export default function DeleteButton({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (json.error) {
      console.log(error);
      setIsLoading(false);
    }

    if (!json.error) {
      router.refresh();
      router.push("/tickets");
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn bg-red-500 text-white rounded-sm"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading && (
        <>
          <TiDelete />
          Deleting...
        </>
      )}
      {!isLoading && (
        <>
          <TiDelete />
          Delete
        </>
      )}
    </button>
  );
}