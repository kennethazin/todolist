import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import { Trash2 } from "lucide-react";

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
        onClick={() => onRemove(todo.id)}
        className="text-destructive"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </li>
  );
}
