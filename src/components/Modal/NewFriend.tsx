import React from "react";
import styled from "styled-components";
import theme from "@/theme/theme";

export default function NewFriend() {
  return (
    <ModalWrapper>
      <p className="title">추가할 친구의 이메일을 작성해 주세요.</p>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 30%;
  left: 89%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 280px;
  height: 280px;
  border: 1px solid black;
  border-radius: 20px;

  background-color: #f8f8f8;
  z-index: 1000; /* 모달이 다른 요소 위에 나타나도록 설정 */
  .title {
    margin-top: 60.55px;
    width: 230px;
    font-size: 12px;
    margin-left: 20px;
  }
`;
