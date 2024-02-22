import Image from 'next/image';
import styled from 'styled-components';
import EditTagIcon from '../../../public/icons/tagEdit.png';
import CancelIcon from '../../../public/icons/cancel.png';
import { MouseEvent, useState } from 'react';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_URL } from '@/api/todo';

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

interface CreateTagModalProps {
  onComplete: () => void;
  todoTags: TodoTagListState[];
}

const EditTagModal = ({ onComplete, todoTags }: CreateTagModalProps) => {
  const [internalTodoTags, setInternalTodoTags] =
    useState<TodoTagListState[]>(todoTags);

  const onsubmitHandler = () => {
    onComplete();
  };

  const handleTagDelete = (id: number) => (e: MouseEvent<HTMLDivElement>) => {
    console.log('tag delete clicked');
    e.preventDefault();
    axios
      .delete(`${NEXT_PUBLIC_BASE_URL}/todo-tags/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        console.log('Delete successful, response:', response);
        setInternalTodoTags((prevTags) =>
          prevTags.filter((tag) => tag.id !== id)
        );
      })
      .catch((error) => {
        console.error('Delete failed, error:', error);
      });
  };

  return (
    <ModalWrapper>
      <TagTitle>TAG</TagTitle>

      <TagListWrapper>
        {internalTodoTags.map((tag) => {
          return (
            <TagList key={tag.id}>
              <TagListElement>
                <div
                  style={{
                    backgroundColor: tag.color,
                    width: '16px',
                    height: '16px',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                  }}
                ></div>
                <div>{tag.tagName}</div>
              </TagListElement>
              <TagListElement>
                <div>
                  <Image
                    src={EditTagIcon}
                    alt={'EditTagIcon'}
                    width={16}
                    height={16}
                  />
                </div>
                <div onClick={handleTagDelete(tag.id)}>
                  <Image
                    src={CancelIcon}
                    alt={'CancelIcon'}
                    width={14}
                    height={14}
                  />
                </div>
              </TagListElement>
            </TagList>
          );
        })}
      </TagListWrapper>

      <TodoSubmit type="button" onClick={onsubmitHandler}>
        완료
      </TodoSubmit>
    </ModalWrapper>
  );
};

export default EditTagModal;

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

const TagTitle = styled.h1`
  width: 70px;
  height: 46px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;

  color: #1890ff;

  border-bottom: 2px solid #1890ff;
`;

const TagListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  gap: 10px;
`;

const TagList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

const TagListElement = styled.div`
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
