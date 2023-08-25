"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addTicket(formData) {
  const ticket = Object.fromEntries(formData);

  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //insert data
  const { error } = await supabase.from("tickets").insert({
    ...ticket,
    user_email: session.user.email,
  });

  if (error) {
    throw new Error("Could not add new ticket");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

export async function deleteTicket(id) {
  const supabase = createServerActionClient({ cookies });

  //delete the data
  const { error } = await supabase.from("tickets").delete("id", id);

  if (error) {
    throw new Error("Could not delete ticket");
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}
