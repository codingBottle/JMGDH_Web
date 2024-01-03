import React from 'react';
import styled from 'styled-components';

interface Todo {
  id: number;
  content: string;
  isCheck: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onCheck: (id: number) => void;
}

const TodoList = ({ todos, onCheck }: TodoListProps) => {
  const handleCheck = (id: number) => {
    onCheck(id);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} isCheck={todo.isCheck}>
          <TodoCheckbox
            type="checkbox"
            checked={todo.isCheck}
            onChange={() => handleCheck(todo.id)}
          />
          <TodoText>{todo.content}</TodoText>
        </TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;

const TodoItem = styled.li<{ isCheck: boolean }>`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  list-style: none;
  ${(props) =>
    props.isCheck &&
    `
    color: gray;
    text-decoration: line-through;
  `}
`;

const TodoCheckbox = styled.input.attrs({ type: 'checkbox' })`
  accent-color: gray;
`;

const TodoText = styled.span`
  margin-left: 0.5rem;

`;
