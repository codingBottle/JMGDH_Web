import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import TodoList from './TodoList';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_URL } from '@/api/todo';

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
/*
 랜덤한 컬러를 주기위한 임시 함수
const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
*/

const TodoTagList = ({ date }: TodoTagListProps) => {
  /*
  mock data를 위한 tagMapping, tags state
  const TagMapping = ['문화생활', '학교', '친구', '알바', '동아리'];
  const [tags, setTags] = useState<Tag[]>([]);
  */
  const [todos, setTodos] = useState<{ [key: number]: Todo[] }>({});
  const [toggle, setToggle] = useState<Array<number>>([]);
  const [inputs, setInputs] = useState<{ [key: number]: string }>({});
  const [newTagInput, setNewTagInput] = useState<string>('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [showInput, setShowInput] = useState<{ [key: number]: boolean }>({});

  // 받아온 태그객체들을 저장할 state
  const [todoTags, setTodoTags] = useState<TodoTagListState[]>([]);

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
  /*
기존 태그를 사용할 때 사용한 코드
  useEffect(() => {
    const mappedTags = TagMapping.map((name, index) => ({
      id: index,
      name,
      color: getRandomColor(),
    }));
    setTags(mappedTags);
  }, []);
*/
  const handleTagClick = (tagId: number) => {
    if (toggle.includes(tagId)) {
      setToggle(toggle.filter((id) => id !== tagId));
    } else {
      setToggle([...toggle, tagId]);
    }
  };

  const handleAddTodo = (tagId: number) => {
    const newTodo: Todo = {
      id: tagId,
      content: inputs[tagId] || '',
      isCheck: false,
    };

    setTodos({
      ...todos,
      [tagId]: [...(todos[tagId] || []), newTodo],
    });

    setInputs({
      ...inputs,
      [tagId]: '',
    });

    setShowInput({
      ...showInput,
      [tagId]: false,
    });
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

  const handleAddTodoBtnClick = (tagId: number) => {
    setShowInput({
      ...showInput,
      [tagId]: !showInput[tagId],
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
                    <button onClick={() => handleAddTodo(tag.id)}>추가</button>
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
