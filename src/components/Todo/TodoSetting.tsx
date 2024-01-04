import { useState } from 'react';
import styled from 'styled-components';
import TodoTagList from './TodoTagList';

const TodoSetting = () => {
  const [newTag, setNewTag] = useState<string>('');
  
  const handleAddTag = () => {
    setNewTag('새로운 태그 이름'); // 여기에 실제로 입력받은 태그 이름을 설정해야 합니다.
  };

  return (
    <SettingContainer>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
      >
        <g id="Layer_2">
          <g id="Workspace">
            <rect style={{ fill: 'none' }} height="24" width="24" />
            <path
              style={{
                fill: 'none',
                stroke: '#000',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
              d="M10.22,7l.28-2h3l.28,2a5.53,5.53,0,0,1,1.69,1l1.84-.74,1.5,2.6L17.25,11a5.33,5.33,0,0,1,0,2l1.56,1.22-1.5,2.6-1.84-.74a4.58,4.58,0,0,1-.8.56,4.73,4.73,0,0,1-.89.41l-.28,2h-3l-.28-2a5.53,5.53,0,0,1-1.69-1l-1.84.74-1.5-2.6L6.75,13a5.33,5.33,0,0,1,0-2L5.19,9.8l1.5-2.6,1.84.74a4.58,4.58,0,0,1,.8-.56A4.73,4.73,0,0,1,10.22,7Z"
            />
            <circle
              style={{
                fill: 'none',
                stroke: '#000',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
              cx="12"
              cy="12"
              r="2.5"
            />
          </g>
        </g>
      </svg>
      <button onClick={handleAddTag}>NewTag +</button>
    </SettingContainer>
  );
};

export default TodoSetting;

const SettingContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 50px;
  gap: 80px;
`;

const NewTagBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 30px;

  border-radius: 5px;

  cursor: pointer;

  span {
    margin-left: 5px;
  }
`;
