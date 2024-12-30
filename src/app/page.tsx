"use client"

import TodoList from "../components/TodoList";
import { ModeToggle } from "@/components/mode-toggle";
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-14">
      <h1 className="text-3xl font-medium text-center ">
          {currentDate}

      </h1>
      <TodoList />
      <div className="fixed bottom-4 right-4">
      <ModeToggle />
      </div>
    </main>
  );
}
