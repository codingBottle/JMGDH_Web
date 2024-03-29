import React, { useState, useEffect } from 'react';
import { NEXT_PUBLIC_BASE_URL } from '@/api/todo';
import axios from 'axios';
import Image from 'next/image';
import styled from 'styled-components';
import TodoList from './TodoList';
import CreateTodoModal from './CreateTodoModal';
import NewTagImg from '../../../public/icons/NewTag.png';
import CreateTagModal from './CreateTagModal';
import { useRouter } from 'next/router';
import EditTagModal from './EditTagModal';

interface TodoTagListProps {
  date: Date;
}

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

const TodoTagList = ({ date }: TodoTagListProps) => {
  const [toggle, setToggle] = useState<Array<number>>([]);
  // 받아온 태그객체들을 저장할 state
  const [todoTags, setTodoTags] = useState<TodoTagListState[]>([]);
  const [todos, setTodos] = useState<{ [key: number]: TodoState[] }>({});
  // 선택된 태그의 ID를 저장하는 상태를 추가합니다.
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const [tagSetting, setTagSetting] = useState(false);

  const route = useRouter();

  // + 버튼 클릭 시 호출되는 함수를 수정하여 선택된 태그의 id를 저장하고 모달을 열도록 합니다.
  const handleAddTodoBtnClick = (tagId: number) => {
    setSelectedTagId(tagId); // 선택된 태그의 ID를 저장합니다.
    setIsModalOpen(true); // 모달을 엽니다.
  };

  // 모달의 완료 버튼 클릭 시 모달창 닫는 함수
  const handleCompleteClick = () => {
    setIsModalOpen(false);
  };

  const handleAddTagClick = () => {
    setIsTagModalOpen(true);
  };

  const handleCompleteTagClick = () => {
    setIsTagModalOpen(false);
  };

  const handleTagSetting = () => {
    setTagSetting(true);
  };

  const handleCompleteTagSetting = () => {
    setTagSetting(false);
  };

  // MM 형식으로 반환
  const month = () => {
    if (date.getMonth() + 1 < 10) {
      return '0' + (date.getMonth() + 1);
    } else {
      return date.getMonth() + 1;
    }
  };

  // DD 형식으로 반환
  const toDayDate = () => {
    if (date.getDate() < 10) {
      return '0' + date.getDate();
    } else {
      return date.getDate();
    }
  };

  // 오늘 날짜를 YYYY-MM-DD 형식으로 반환
  const today = date.getFullYear() + '-' + month() + '-' + toDayDate();

  // api 연결 시 작동될 부분
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      axios
        .get(`${NEXT_PUBLIC_BASE_URL}/todos/date/${today}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })
        .then((res) => {
          setTodoTags(res.data?.data.todoTags);
        });
    }
  }, [today]);

  useEffect(() => {
    if (todoTags) {
      setTodos(
        todoTags.reduce((acc, tag) => {
          acc[tag.id] = tag.todos;
          return acc;
        }, {} as { [key: number]: TodoState[] })
      );
    }
    console.log('todoTags', todoTags);
  }, [todoTags]);

  // 태그 클릭 시 토글되는 함수
  const handleTagClick = (tagId: number) => {
    if (toggle.includes(tagId)) {
      setToggle(toggle.filter((id) => id !== tagId));
    } else {
      setToggle([...toggle, tagId]);
    }
  };

  // todo 추가 함수 였던것
  // 걍 모달에서 api요청했음
  const handleAddTodo = async (todoContent: string) => {};

  // 체크박스 클릭 시 호출되는 함수
  const handleCheckboxChange = async (
    tagId: number,
    todoId: number,
    checked: boolean
  ) => {
    try {
      // 서버에 PATCH 요청을 보냅니다.
      axios
        .patch(
          `${NEXT_PUBLIC_BASE_URL}/todos/${todoId}/check`,
          {
            // checked: !checked, // 기존 상태를 반전하여 보냅니다.
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          if (!todos[tagId]) {
            return;
          }
          setTodos((prevTodos) => {
            console.log('state 내부 이전값', prevTodos); // 현재 prevTodos 값을 출력
            return {
              ...prevTodos,
              [tagId]: prevTodos[tagId].map((todo) =>
                todo.id === todoId ? { ...todo, checked: !checked } : todo
              ),
            };
          });
          route.reload();
        });

      // 요청이 성공적으로 처리되면 클라이언트 측 상태를 업데이트합니다.
    } catch (error) {
      // 에러 처리
      console.log(error);
    }
  };

  return (
    <TodoContainer>
      <TotalTag>
        {todoTags.map((tag) => (
          <TagBtn key={tag.id} color={tag.color}>
            <div className="tag-color" onClick={() => handleTagClick(tag.id)}>
              {tag.tagName}
              <Image
                className="tag-status"
                src={toggle.includes(tag.id) ? '/tagopen.png' : '/tagClose.png'}
                alt={toggle.includes(tag.id) ? 'tagOpen' : 'tagClose'}
                width={8}
                height={6}
              ></Image>
            </div>
            <button
              className="addTodoBtn"
              onClick={() => {
                handleAddTodoBtnClick(tag.id);
              }}
            >
              +
            </button>
            {/* todo 추가 모달 부분 */}
            {isModalOpen && (
              <CreateTodoModal
                todoTags={todoTags}
                onAddTodo={handleAddTodo}
                selectedTagId={selectedTagId}
                onComplete={handleCompleteClick}
              />
            )}
            {/* 해당 토글이 눌렸을때 보여지는 투두 */}
            {toggle.includes(tag.id) && (
              <div className="todo-color">
                {tag.todos && (
                  <TodoList
                    todos={tag.todos}
                    onCheck={(todoId, checked) =>
                      handleCheckboxChange(tag.id, todoId, checked)
                    }
                  />
                )}
              </div>
            )}
          </TagBtn>
        ))}
      </TotalTag>
      {/* 맨 밑의 태그추가 부분 여기도 모달 띄울꺼임*/}
      <SettingContainer>
        <div onClick={handleTagSetting}>
          {tagSetting && (
            <EditTagModal
              todoTags={todoTags}
              onComplete={handleCompleteTagSetting}
            />
          )}
          <Image
            src={'/todoSetting.png'}
            alt={'todosetting'}
            width={20}
            height={20}
          ></Image>
        </div>
        <div onClick={handleAddTagClick}>
          {isTagModalOpen && (
            <CreateTagModal onComplete={handleCompleteTagClick} />
          )}
          <Image
            src={NewTagImg}
            alt={'Add Tag Img'}
            width={30}
            height={30}
          ></Image>
        </div>
      </SettingContainer>
    </TodoContainer>
  );
};

export default TodoTagList;

const TodoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  height: 100%;
`;

const TotalTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  width: 100%;
  margin-top: 0.625rem;
  margin-left: 0.625rem;
  margin-bottom: 3.125rem;
  gap: 0.625rem;
`;

const TagBtn = styled.div`
  cursor: pointer;

  .tag-color {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    padding: 0 0.625rem;
    border-radius: 0.25rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.color};
  }

  .tag-status {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.625rem;
  }

  .addTodoBtn {
    all: unset;
    margin-left: 0.625rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.25rem;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`;

const Inputdiv = styled.div`
  margin: 0.625rem 0;
`;

const SettingContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10%;
  width: 90%;
  height: 50px;

  &:hover {
    cursor: pointer;
  }
`;
