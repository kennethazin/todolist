import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import { X } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (id: number) => {
    setIsRemoving(true);
    await onRemove(id);
    setIsRemoving(false);
  };

  return (
    <li className="flex items-center space-x-2 bg-secondary p-2 rounded-md">
      <Checkbox
        className="shadow-none"
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        id={`todo-${todo.id}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow ${
          todo.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {todo.text}
      </label>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleRemove(todo.id)}
        className="hover:opacity-75 flex items-center justify-center"
        disabled={isRemoving}
      >
        {isRemoving ? (
          <Spinner variant="circle" />
        ) : (
          <X className="hover:fill-yellow-50" />
        )}
      </Button>
    </li>
  );
}
