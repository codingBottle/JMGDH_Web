import React from "react";
import styled from "styled-components";
import theme from "@/theme/theme";

const ModalDay = () => {
  return (
    <ModalWrapper>
      <Title>일정 만들기</Title>
      <Contents>
        <div className="write-schedule">
          <input type="text" placeholder="일정명을 적어주세요" />
        </div>
        <div className="start-end-schedule schedule-box">
          <div>
            <span>아이콘</span>
            <div>2023년 12월 01일</div>
          </div>
          <button>종료일 추가</button>
        </div>
        <div className="start-end-schedule-time schedule-box">
          <div>
            <span>아이콘</span>
            <div>12월 01일(수) 13:00 ~ 12월 01일(수) 14:00</div>
          </div>
          <button>시간 설정</button>
        </div>
        <div className="select-color">
          <span>아이콘</span>
          <div>
            <span>red</span>
            <span>yellow</span>
            <span>green</span>
            <span>blue</span>
            <span>purple</span>
          </div>
        </div>
        <div className="add-manager">
          <span>아이콘</span>
          <input type="text" placeholder="담당자 추가" />
        </div>
      </Contents>
    </ModalWrapper>
  );
};

export default ModalDay;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 480px;
  height: 600px;
  padding: 50px;
  background-color: #fff;
  border-radius: 20px;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: #1890ff;
  font-size: 14px;
  font-weight: ${theme.fontWeight.Regular};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 40px;
  width: 100%;
  font-size: 14px;
  color: ${theme.color.GrayScale.Gray300};

  button {
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    color: ${theme.color.GrayScale.Gray300};
    background-color: transparent;
    border: 1px solid ${theme.color.GrayScale.Gray300};
  }

  .schedule-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }

  .write-schedule {
    width: 100%;

    input {
      display: inline-block;
      width: 100%;
      padding: 10px 0;
      font-size: 16px;
      background-color: transparent;
      border: none;
      outline: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  .start-end-schedule,
  .start-end-schedule-time {
    div {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }
  }

  .select-color,
  .add-manager {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  .add-manager {
    width: 100%;
    input {
      display: inline-block;
      /* width: 100%; */
      color: ${theme.color.GrayScale.Gray300};
      font-size: 16px;
      font-weight: ${theme.fontWeight.light};
      background-color: transparent;
      border: none;
      outline: none;
    }
  }
`;
