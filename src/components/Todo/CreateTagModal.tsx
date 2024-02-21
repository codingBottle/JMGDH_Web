import { NEXT_PUBLIC_BASE_URL } from '@/api/todo';
import axios from 'axios';
import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface CreateTagModalProps {
  onComplete: () => void;
}

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

const CreateTagModal = ({ onComplete }: CreateTagModalProps) => {
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('');

  const router = useRouter();


  console.log('tagName', tagName);
  console.log('tagColor', tagColor);
  
  const onsubmitTagHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(
        `${NEXT_PUBLIC_BASE_URL}/todo-tags`,
        {
          tagName: tagName,
          tagColor: tagColor,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert('작성 완료');
        onComplete();
        router.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ModalWrapper>
      <TagTitle>NEW TAG</TagTitle>

      <TagForm>
        <TagInputWrapper>
          <TagTitleInput
            type="text"
            placeholder="태그 이름을 입력해주세요"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
        </TagInputWrapper>
        <TagColor>
          {colors.map((color, index) => (
            <div key={index}>
              <div
                onClick={() => setTagColor(color)}
                style={{
                  backgroundColor: color,
                  width: '25px',
                  height: '25px',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                }}
              ></div>
            </div>
          ))}
        </TagColor>
      </TagForm>

      <TodoSubmit type="button" onClick={onsubmitTagHandler}>
        완료
      </TodoSubmit>
    </ModalWrapper>
  );
};

export default CreateTagModal;

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
  height: 400px;
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

const TagForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 380px;

  gap: 30px;
  padding-bottom: 4rem;
`;

const TagInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

const TagColor = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
