import { login } from "./actions";
import Link from "next/link";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/src/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-none">
          <CardHeader>
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-3xl font-bold">Welcome to Noto</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your email below to login to your account
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" required type="password" />
              </div>
              <Button className="w-full" formAction={login}>
                Log in
              </Button>
            </form>
            <Separator />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link className="text-sm underline hover:opacity-70" href="/signup">
              Don&apos;t have an account? Sign up here
            </Link>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
