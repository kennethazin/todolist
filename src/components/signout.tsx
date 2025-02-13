import React from "react";
import { LogOut } from "lucide-react";
import { signout } from "@/src/app/login/actions";

export const SignOut = () => {
  return (
    <div>
      <LogOut onClick={signout} />
    </div>
  );
};

export default SignOut;
