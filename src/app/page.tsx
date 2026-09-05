import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import DashboardClient from "./Dashboardclient";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .eq("user_id", user.id)
    .order("score", { ascending: false });

  if (error) {
    console.error("Failed to fetch leads:", error);
  }

  return (
    <>
      <div
        style={{
          background: "#111827",
          color: "#e5e7eb",
          fontFamily: "monospace",
          fontSize: "12px",
          padding: "10px 16px",
          wordBreak: "break-all",
        }}
      >
        DEBUG — logged-in user_id: {user.id} | leads returned: {leads?.length ?? 0}
        {error ? ` | ERROR: ${error.message}` : ""}
      </div>
      <DashboardClient initialLeads={leads ?? []} />
    </>
  );
}