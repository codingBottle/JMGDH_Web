import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import styled from 'styled-components';

interface Tag {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  content: string;
  isCheck: boolean;
}

const TodoTagList = () => {
  const TagMapping = ['문화생활', '학교', '친구', '알바', '동아리'];
  const [tags, setTags] = useState<Tag[]>([]);
  const [todos, setTodos] = useState<{ [key: number]: Todo[] }>({});
  const [toggle, setToggle] = useState<number | null>(null);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const mappedTags = TagMapping.map((name, index) => ({ id: index, name }));
    setTags(mappedTags);
  }, []);

  const handleTagClick = (tagId: number) => {
    setToggle(tagId);
  };

  const handleAddTodo = (tagId: number) => {
    const newTodo: Todo = {
      id: Date.now(),
      content: input,
      isCheck: false,
    };

    setTodos({
      ...todos,
      [tagId]: [...(todos[tagId] || []), newTodo],
    });

    setInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <TotalTag>
      {tags.map((tag) => (
        <TagBtn key={tag.id}>
          <div onClick={() => handleTagClick(tag.id)}>
            {tag.name}
          </div>
          {toggle === tag.id && (
            <div>
              {todos[tag.id] && <TodoList todos={todos[tag.id]} />}
              <div>
                <input type="text" value={input} onChange={handleInputChange} />
                <button onClick={() => handleAddTodo(tag.id)}>
                  추가
                </button>
              </div>
            </div>
          )}
        </TagBtn>
      ))}
    </TotalTag>
  );
};

export default TodoTagList;

const TotalTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  gap: 10px;
`;

const TagBtn = styled.div`
  background-color: aliceblue;

  cursor: pointer;
`;
