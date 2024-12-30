'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import TodoItem from './TodoItem'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos')
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'open') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const openTasks = todos.filter(todo => !todo.completed).length

  return (
    <div className="w-full max-w-md space-y-4">
         <div className="text-sm text-muted-foreground text-center">
        {openTasks === 0 ? (
          "There are no open tasks"
        ) : (
          `There ${openTasks === 1 ? 'is' : 'are'} ${openTasks} task${openTasks === 1 ? '' : 's'} open`
        )}
      </div>
      <form onSubmit={addTodo} className="flex space-x-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow shadow-none outline-none rounded-full "
        />
        <Button type="submit" className='rounded-full px-7'>Add</Button>
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
      
     
      
    </div>

  )
}


function renderTodoList(todos: Todo[], onToggle: (id: number) => void, onRemove: (id: number) => void) {
    if (todos.length === 0) {
      return <p className="text-center text-muted-foreground">No tasks found</p>
    }
    
    return (
      <ul className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
    )
  }

