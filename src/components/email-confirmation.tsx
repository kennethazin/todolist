import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { signup } from "@/src/app/login/actions";

function ConfirmationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="min-w-full hover:fill-[#171717]"
          formAction={signup}
          type="submit"
        >
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px] rounded-lg">
        <DialogHeader>
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="size-6 text-green-600" />
          </div>
          <DialogTitle className="text-center">
            Confirmation Email Sent
          </DialogTitle>
          <DialogDescription className="text-center">
            <span>
              We&apos;ve sent a confirmation link to your email address. Please
              check your inbox and follow the instructions to confirm your
              email.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full bg-[#2563eb] hover:bg-[#2563eb]/90"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Okay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { ConfirmationDialog };
