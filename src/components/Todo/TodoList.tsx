import Image from 'next/image';
import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import KebabIcon from '../../../public/icons/kebab.png';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_URL } from '@/api/todo';
import { useRouter } from 'next/router';
import { Divider } from 'antd';

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
  const [selectState, setSelectState] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');

  const router = useRouter();

  const handleCheck = (id: number, checked: boolean) => {
    onCheck(id, checked); // 체크 상태를 반전시킵니다.
  };

  const handleKebabClick = () => {
    console.log('kebab clicked');
    setSelectState(!selectState);
  };

  const handleDelete = (id: number) => (e: MouseEvent<HTMLButtonElement>) => {
    console.log('delete clicked');
    e.preventDefault();
    axios
      .delete(`${NEXT_PUBLIC_BASE_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log('Delete successful, response:', response);
        router.reload();
      })
      .catch((error) => {
        console.error('Delete failed, error:', error);
      });
  };

  const handleEdit = (id: number) => (e: MouseEvent<HTMLButtonElement>) => {
    setEditing(!editing);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlEditeSubmit = (id: number) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 리로딩 방지
    // 여기서 제출 로직 구현
    setEditing(!editing);

    axios
      .patch(
        `${NEXT_PUBLIC_BASE_URL}/todos/${id}/title`,
        { title: title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )
      .then((res) => {
        console.log('title edit success', res);
        router.reload();
      })
      .catch((err) => {
        console.log('title edit failed', err);
      });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id || title} checked={todo.checked}>
          <TodoWrapper>
            <TodoCheckbox
              type="checkbox"
              checked={todo.checked}
              onChange={() => handleCheck(todo.id, todo.checked)}
            />
            {editing ? (
              <TodoText>
                <form onSubmit={handlEditeSubmit(todo.id)}>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </form>
              </TodoText>
            ) : (
              <TodoText>{todo.title}</TodoText>
            )}
          </TodoWrapper>
          <KebabImg onClick={handleKebabClick}>
            <Image src={KebabIcon} alt={'kebab icon'} width={20} height={20} />
            {selectState && (
              <KebabMenu>
                <button value={todo.id} onClick={handleDelete(todo.id)}>
                  삭제하기
                </button>
                <button onClick={handleEdit(todo.id)}>수정하기</button>
                <div>복사하기</div>
                <div>붙여넣기</div>
              </KebabMenu>
            )}
          </KebabImg>
        </TodoItem>
      ))}
    </ul>
  );
};

export default TodoList;

const TodoItem = styled.li<{ checked: boolean }>`
  display: flex;
  flex-direction: row;
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

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TodoCheckbox = styled.input.attrs({ type: 'checkbox' })`
  accent-color: gray;
`;

const TodoText = styled.span`
  margin-left: 0.5rem;
  width: 190px;
  text-overflow: ellipsis;
`;

const KebabImg = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  margin-left: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const KebabMenu = styled.div`
  position: absolute;
  top: 25px;
  right: 0px;

  display: flex;
  flex-direction: column;

  width: 100px;

  z-index: 100;
  padding: 0.5rem 0;
  gap: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  background-color: white;

  div {
    padding: 0.5rem;
    text-align: center;
    &:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
  }

  button {
    padding: 0.5rem;
    text-align: center;
    background-color: white;
    border: none;
    &:hover {
      background-color: #f5f5f5;
      cursor: pointer;
    }
  }
`;
