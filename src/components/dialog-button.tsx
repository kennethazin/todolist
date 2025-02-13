"use client";
import { useEffect, useState } from "react";
import { login, signout } from "@/src/app/login/actions";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { ConfirmationDialog } from "./email-confirmation";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface DialogButtonProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}

export default function DialogButton({
  showDialog,
  setShowDialog,
}: DialogButtonProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, [supabase]);

  return (
    <div className="ml-5 mt-5 flex items-center fixed ">
      <>
        {user ? (
          <Button
            variant="outline"
            onClick={() => {
              signout()
                .then(() => {
                  window.location.reload();
                })
                .then(() => {
                  toast({
                    description: "Signed out successfully",
                    duration: 5000,
                  });
                });
            }}
          >
            Sign out
          </Button>
        ) : (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsSignUp(false)}>
                Sign in
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div>
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
                  aria-hidden="true"
                >
                  <svg
                    className="stroke-zinc-800 dark:stroke-zinc-100"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="12"
                      fill="none"
                      strokeWidth="8"
                    />
                  </svg>
                </div>
                <DialogHeader>
                  <DialogTitle className="sm:text-center">
                    {isSignUp
                      ? "Create a Noto account"
                      : "Welcome back to Noto"}
                  </DialogTitle>
                  <DialogDescription className="sm:text-center">
                    {isSignUp
                      ? "Enter your details to create a new account."
                      : "Enter your credentials to login to your account."}
                  </DialogDescription>
                </DialogHeader>
              </div>

              <form className="space-y-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      required
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-center w-max"></div>
                {isSignUp ? (
                  <ConfirmationDialog />
                ) : (
                  <Button className="w-full" formAction={login} type="submit">
                    Sign in
                  </Button>
                )}
              </form>

              <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                <span className="text-xs text-muted-foreground">Or</span>
              </div>

              <Button
                variant="outline"
                onClick={() => setIsSignUp(!isSignUp)}
                type="button"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </Button>
            </DialogContent>
          </Dialog>
        )}
        {user && <div className="text-sm ml-3">Hi, {user.email}</div>}
      </>
    </div>
  );
}
