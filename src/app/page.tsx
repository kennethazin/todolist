import TodoList from "../components/TodoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-14">
      <h1 className="text-2xl font-medium text-center mb-4">
        {new Date().toLocaleString() + ""}
      </h1>
      <TodoList />
    </main>
  );
}
