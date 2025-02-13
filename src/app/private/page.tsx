import { redirect } from "next/navigation";
import { signout } from "../login/actions";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/src/components/ui/button";
export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div>
      <p>Hello {data.user.email} </p>
      <Button onClick={signout}>signout</Button>
    </div>
  );
}
