import React from "react";
import styled from "styled-components";
import theme from "@/theme/theme";

export default function NewFriend() {
  return (
    <ModalWrapper>
      <p className="title">추가할 친구의 이메일을 작성해 주세요.</p>
      <input placeholder="ex)aaa@aaaaa.com"></input>
      <button>초대 보내기</button>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 30%;
  left: 89%;
  transform: translate(-50%, -50%);

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
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 44.45px;
  }
  input {
    margin-top: 0px;
    margin-right: auto;
    margin-left: 10px;
    width: 260px;
    height: 30px;
    padding-left: 20px;
    border-radius: 12px;
    border: 1px solid #dbdbdb;
  }
  button {
    margin-top: 62px;
    margin-right: auto;
    margin-left: 30px;
    width: 220px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dbdbdb;
  }
`;
