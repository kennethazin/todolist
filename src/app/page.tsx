"use client";
import { useState } from "react";
import TodoList from "../components/TodoList";
import { ModeToggle } from "@/src/components/mode-toggle";
import DialogButton from "../components/dialog-button";
import { CurrentDate } from "../components/date";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <DialogButton showDialog={showDialog} setShowDialog={setShowDialog} />
      <main className="flex min-h-screen flex-col items-center justify-center p-5 lg:p-14">
        <CurrentDate />
        <TodoList />
        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
      </main>
    </>
  );
}
