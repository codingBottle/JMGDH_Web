import theme from '@/theme/theme';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

import TodoTag from '../../../public/icons/TodoTag.png';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_URL } from '@/api/todo';
import { MouseEvent } from 'react';

interface TodoTagListState {
  id: number;
  color: string;
  tagName: string;
  todos: Array<TodoState>;
}

interface TodoState {
  id: number;
  title: string;
  checked: boolean;
}

interface CreateModalProps {
  onAddTodo: (todoContent: string) => void;
  selectedTagId: number | null; // 선택된 태그의 ID를 추가합니다.
  todoTags: TodoTagListState[];
  onComplete: () => void; // 완료 버튼 클릭 시 호출되는 함수를 추가합니다.
}

const CreateModal = ({
  onAddTodo,
  onComplete,
  selectedTagId,
  todoTags,
}: CreateModalProps) => {
  const accessToken = localStorage.getItem('accessToken');
  const [title, setTitle] = useState('');
  const [todoDate, setTtodoDate] = useState('');
  const [tagId, setTagId] = useState(selectedTagId);

  const handleTodoTime = (e: any) => {
    setTtodoDate(e.target.value);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleTagId = (e: any) => {
    setTagId(e.target.value);
  };

  console.log('title', title);
  console.log('todoDate', todoDate);

  const onsubmitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        `${NEXT_PUBLIC_BASE_URL}/todos`,
        {
          title: title,
          date: todoDate,
          tagId: tagId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert('작성 완료');
        onComplete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ModalWrapper>
      <TagList>TAG LIST</TagList>
      <TagForm>
        <TagTitle>
          <TagTitleInput
            type="text"
            placeholder="투두를 입력해 주세요."
            value={title}
            onChange={handleTitle}
          />
        </TagTitle>
        <div>
          <div>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.54 2.7225H18.5V0.8025C18.5 0.6705 18.392 0.5625 18.26 0.5625H16.58C16.448 0.5625 16.34 0.6705 16.34 0.8025V2.7225H8.66V0.8025C8.66 0.6705 8.552 0.5625 8.42 0.5625H6.74C6.608 0.5625 6.5 0.6705 6.5 0.8025V2.7225H1.46C0.929 2.7225 0.5 3.1515 0.5 3.6825V23.6025C0.5 24.1335 0.929 24.5625 1.46 24.5625H23.54C24.071 24.5625 24.5 24.1335 24.5 23.6025V3.6825C24.5 3.1515 24.071 2.7225 23.54 2.7225ZM22.34 22.4025H2.66V11.0025H22.34V22.4025ZM2.66 8.9625V4.8825H6.5V6.3225C6.5 6.4545 6.608 6.5625 6.74 6.5625H8.42C8.552 6.5625 8.66 6.4545 8.66 6.3225V4.8825H16.34V6.3225C16.34 6.4545 16.448 6.5625 16.58 6.5625H18.26C18.392 6.5625 18.5 6.4545 18.5 6.3225V4.8825H22.34V8.9625H2.66Z"
                fill="black"
                fill-opacity="0.85"
              />
            </svg>
            <input
              type="date"
              name="todoDate"
              id="todoStartDate"
              onChange={handleTodoTime}
            />
          </div>
        </div>
        <TodoTagSelect>
          <div>
            <Image src={TodoTag} alt={''} width={23} height={23} />
          </div>
          <select name="" id="" onChange={handleTagId}>
            {todoTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.tagName}
              </option>
            ))}
          </select>
        </TodoTagSelect>
      </TagForm>
      <TodoSubmit type="button" onClick={onsubmitHandler}>
        완료
      </TodoSubmit>
    </ModalWrapper>
  );
};

export default CreateModal;

const ModalWrapper = styled.div`
  position: fixed; /* 부모 요소가 아닌 뷰포트를 기준으로 위치를 결정합니다. */
  top: 50%; /* 뷰포트의 중앙에 위치시킵니다. */
  left: 50%; /* 뷰포트의 중앙에 위치시킵니다. */
  transform: translate(
    -50%,
    -50%
  ); /* 요소 자체의 중앙이 뷰포트의 중앙에 오도록 위치를 조정합니다. */

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  height: 550px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const TagForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 380px;

  gap: 10px;
`;

const TagTitle = styled.div`
  width: 100%;

`;
const TagTitleInput = styled.input`
  all: unset;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 10px;

  &:hover {
    cursor: pointer;
  }
`;

const TagList = styled.h1`
  width: 58px;
  height: 46px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;

  color: #1890ff;

  border-bottom: 2px solid #1890ff;
`;

const TodoTagSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 10px;
`;

const TodoSubmit = styled.button`
  width: 380px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
`;
