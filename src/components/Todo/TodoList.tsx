import React from 'react';

interface Todo {
  id: number;
  content: string;
  isCheck: boolean;
}

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.content} {todo.isCheck ? '✔️' : '❌'}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
