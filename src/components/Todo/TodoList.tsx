import React from 'react';
import styled from 'styled-components';

interface Todo {
  id: number;
  title: string;
  checked: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onCheck: (id: number, checked: boolean) => void;
}

const TodoList = ({ todos, onCheck }: TodoListProps) => {
  const handleCheck = (id: number, checked: boolean) => {
    onCheck(id, checked); // 체크 상태를 반전시킵니다.
    console.log('id', id);
    console.log('checked', checked);
    console.log('onckenked', onCheck);
  };

  console.log('나는 언제 바뀜?');

  console.log('todos', todos);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} checked={todo.checked}>
          <TodoCheckbox
            type="checkbox"
            checked={todo.checked}
            onChange={() => handleCheck(todo.id, todo.checked)}
          />
          <TodoText>{todo.title}</TodoText>
        </TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;

const TodoItem = styled.li<{ checked: boolean }>`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  list-style: none;
  ${(props) =>
    props.checked &&
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
