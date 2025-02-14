"use client";

import { useState, useEffect } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import TodoItem from "./TodoItem";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/src/components/ui/toast";
import LoadingSkeleton from "./loading-skeleton";
import DialogButton from "./dialog-button";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [todoAdding, setTodoAdding] = useState(false);

  const supabase = createClient();
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const { toast } = useToast();

  // load todos
  useEffect(() => {
    const fetchTodos = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id;

      if (userId) {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .eq("user_id", userId);

        if (error) {
          console.error("Error fetching todos:", error);
        } else {
          setTodos(data || []);
        }
      }
      setLoading(false);
    };

    fetchTodos();

    const loginCheckTimeout = setTimeout(() => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) {
          toast({
            title: "Sign in required",
            description: "Please sign in to add and view your saved todos.",
            action: (
              <ToastAction
                altText="Sign in"
                onClick={() => setShowSignInDialog(true)}
              >
                Sign in
              </ToastAction>
            ),
          });
        }
      });
    }, 5000);

    return () => clearTimeout(loginCheckTimeout);
  }, [supabase]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setTodoAdding(true);

    if (newTodo.trim()) {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ text: newTodo, completed: false }])
        .select();
      toast({ variant: "default", description: "New Noto todo added" });

      if (error) {
        console.error("Error adding todo:", error);
      } else {
        setTodos([...todos, data[0]]);
        setNewTodo("");
      }
    }
    setTodoAdding(false);
  };

  const toggleTodo = async (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !todo.completed })
        .eq("id", id);

      if (error) {
        toast({ variant: "destructive", description: "Error updating todo" });
      }
    }
  };

  const removeTodo = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) {
        toast({ variant: "destructive", description: "Error deleting todo" });
      }
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "open") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const openTasks = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="w-full max-w-md space-y-4">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="hidden">
            <DialogButton
              showDialog={showSignInDialog}
              setShowDialog={setShowSignInDialog}
            />
          </div>
          <div className="text-sm text-muted-foreground text-center">
            {openTasks === 0
              ? "There are no open tasks"
              : `There ${openTasks === 1 ? "is" : "are"} ${openTasks} task${
                  openTasks === 1 ? "" : "s"
                } open`}
          </div>
          <form onSubmit={addTodo} className="flex space-x-2">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="flex-grow shadow-none outline-none  rounded-lg"
            />
            {todoAdding ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="rounded-lg px-7">
                Add
              </Button>
            )}
          </form>

          <Tabs defaultValue="all" onValueChange={setFilter}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {renderTodoList(filteredTodos, toggleTodo, removeTodo)}
            </TabsContent>
            <TabsContent value="open" className="space-y-4">
              {renderTodoList(filteredTodos, toggleTodo, removeTodo)}
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              {renderTodoList(filteredTodos, toggleTodo, removeTodo)}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

function renderTodoList(
  todos: Todo[],
  onToggle: (id: number) => void,
  onRemove: (id: number) => void
) {
  if (todos.length === 0) {
    return <p className="text-center text-muted-foreground">No tasks found</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
