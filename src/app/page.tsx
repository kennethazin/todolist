import TodoList from "../components/TodoList";
import { ModeToggle } from "@/src/components/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5 lg:p-14">
      <h1 className="text-2xl font-medium text-center">
        {new Date().toLocaleDateString() + ""}
      </h1>
      <TodoList />
      <div className="fixed bottom-4 right-4">
        <ModeToggle />
      </div>
    </main>
  );
}
