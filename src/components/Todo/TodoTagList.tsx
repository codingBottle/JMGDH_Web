import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import TodoList from './TodoList';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_URL } from '@/api/todo';
import CreateModal from './CreateModal';

/*
기존 태그를 사용할 때 사용한 인터페이스
interface Tag {
  id: number;
  name: string;
  color: string;
}
*/
interface Todo {
  id: number;
  content: string;
  isCheck: boolean;
}

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

/*
  랜덤한 컬러를 주기위한 임시 변수
const colors = [
  '#FCE3E3',
  '#FCEFDA',
  '#FCFAD7',
  '#D8F1E2',
  '#E6F8D0',
  '#DBF0F5',
  '#D4F5F3',
  '#E4EBF8',
  '#FBE8F1',
  '#EEE8F8',
];
*/

const TodoTagList = ({ date }: TodoTagListProps) => {
  const [todos, setTodos] = useState<{ [key: number]: Todo[] }>({});
  const [toggle, setToggle] = useState<Array<number>>([]);
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [newTagInput, setNewTagInput] = useState<string>('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [showInput, setShowInput] = useState<{ [key: number]: boolean }>({});

  /*************************************************************************** */

  // 받아온 태그객체들을 저장할 state
  const [todoTags, setTodoTags] = useState<TodoTagListState[]>([]);
  // const tagList = [];

  // 선택된 태그의 ID를 저장하는 상태를 추가합니다.
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // + 버튼 클릭 시 호출되는 함수를 수정하여 선택된 태그의 id를 저장하고 모달을 열도록 합니다.
  const handleAddTodoBtnClick = (tagId: number) => {
    setSelectedTagId(tagId); // 선택된 태그의 ID를 저장합니다.
    setIsModalOpen(true); // 모달을 엽니다.
  };

  const handleCompleteClick = () => {
    setIsModalOpen(false);
  };

  const month = () => {
    if (date.getMonth() + 1 < 10) {
      return '0' + (date.getMonth() + 1);
    } else {
      return date.getMonth() + 1;
    }
  };

  const toDayDate = () => {
    if (date.getDate() < 10) {
      return '0' + date.getDate();
    } else {
      return date.getDate();
    }
  };

  const today = date.getFullYear() + '-' + month() + '-' + toDayDate();
  console.log('today:', today);

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

  console.log('todoTags:', todoTags);

  // const handletagList = () => {
  //   todoTags.map((tag) => tagList.push(tag.tagName));
  // };

  /*
새로운 태그를 추가할 때 사용한 코드 
api를 통한 태그 추가 예정 및 참고용 코드
  useEffect(() => {
    if (newTagInput) {
      const newTagObject = {
        id: tags.length,
        name: newTagInput,
        color: getRandomColor(),
      };
      setTags([...tags, newTagObject]);
      setNewTagInput('');
    }
  }, [newTagInput]);
*/
  const handleTagClick = (tagId: number) => {
    if (toggle.includes(tagId)) {
      setToggle(toggle.filter((id) => id !== tagId));
    } else {
      setToggle([...toggle, tagId]);
    }
  };

  // CreateModal 컴포넌트에서 Todo 추가 버튼 클릭 시 호출되는 함수입니다.
  const handleAddTodo = async (todoContent: string) => {
    try {
      // 서버에 POST 요청을 보내 Todo를 추가합니다.
      // 요청 URL과 요청 본문은 실제 API에 맞게 수정해야 합니다.
      const response = await axios.post(
        `${NEXT_PUBLIC_BASE_URL}/todos`,
        {
          title: todoContent,
          tagId: selectedTagId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );

      // 요청이 성공적으로 처리되면 모달을 닫습니다.
      if (response.status === 200) {
        setIsModalOpen(false);
      } else {
        // 요청 처리에 실패한 경우에는 에러 메시지를 출력합니다.
        console.error('Todo 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Todo 추가 중 오류가 발생했습니다:', error);
    }
  };

  const handleInputChange = (
    tagId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputs({
      ...inputs,
      [tagId]: e.target.value,
    });
  };

  const handleAddTagClick = () => {
    setIsInputVisible(true);
  };

  const handleNewTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setNewTagInput(e.currentTarget.value);
      setIsInputVisible(false);
    }
  };

  const handleCheck = (tagId: number, todoId: number) => {
    setTodos({
      ...todos,
      [tagId]: todos[tagId].map((todo) =>
        todo.id === todoId ? { ...todo, isCheck: !todo.isCheck } : todo
      ),
    });
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

            {/*  모달 띄우는 기능이 들어갈 버튼 */}
            {isModalOpen && (
              <CreateModal
                todoTags={todoTags}
                onAddTodo={handleAddTodo}
                selectedTagId={selectedTagId}
                onComplete={handleCompleteClick}
              />
            )}
            <button
              className="addTodoBtn"
              onClick={() => {
                handleAddTodoBtnClick(tag.id);
                console.log('tag.id:', tag.id);
              }}
            >
              +
            </button>

            {/* 해당 토글이 눌렸을때 보여지는 투두 */}
            {toggle.includes(tag.id) && (
              <div className="todo-color">
                {todos[tag.id] && (
                  <TodoList
                    todos={todos[tag.id]}
                    onCheck={(id) => handleCheck(tag.id, id)}
                  />
                )}
                {/* 추가 인풋 */}
                {showInput[tag.id] && (
                  <Inputdiv>
                    <input
                      type="text"
                      value={inputs[tag.id] || ''}
                      onChange={(e) => handleInputChange(tag.id, e)}
                    />
                    {/* <button onClick={() => handleAddTodo(tag.id)}>추가</button> */}
                    <div>여기는 케밥 아이콘 들어갈거엠</div>
                  </Inputdiv>
                )}
              </div>
            )}
          </TagBtn>
        ))}
        {isInputVisible && (
          <input type="text" onKeyPress={handleNewTagKeyPress} />
        )}
      </TotalTag>
      {/* 맨 밑의 태그추가 부분 여기도 모달 띄울꺼임*/}
      <SettingContainer>
        <div>
          <Image
            src={'/todoSetting.png'}
            alt={'todosetting'}
            width={20}
            height={20}
          ></Image>
        </div>
        <button onClick={handleAddTagClick}>NEW TAG +</button>
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
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 50px;
  gap: 80px;

  button {
    all: unset;
    width: 100px;
    height: 30px;
    cursor: pointer;
  }
`;
