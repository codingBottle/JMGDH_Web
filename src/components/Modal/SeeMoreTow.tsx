import React from "react";
import styled from "styled-components";
import theme from "@/theme/theme";

export default function SeeMoreTow() {
  return (
    <Container>
      <TopBox>
        <DayBackground>
          <p className="Day">6</p>
          <p>Fri</p>
        </DayBackground>
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0996 1.41L12.6896 0L7.09961 5.59L1.50961 0L0.0996094 1.41L5.68961 7L0.0996094 12.59L1.50961 14L7.09961 8.41L12.6896 14L14.0996 12.59L8.50961 7L14.0996 1.41Z"
            fill="black"
            fill-opacity="0.2"
          />
        </svg>
      </TopBox>
      <MiddleBox>
        <div>
          <div className="greenbox"></div>
          <p>재훈 님께 인사하기</p>
        </div>
        <div>
          <div className="greenbox"></div>
          <p>챠밍링 홍보 영상 마감일</p>
        </div>
        <div>
          <div className="greenbox"></div>
          <p>코딩보틀 동아리 전체 회의</p>
        </div>
        <div>
          <div className="greenbox"></div>
          <p>노트북 챙기기</p>
        </div>
        <div>
          <div className="color10"></div>
          <p>강아지 산책 시키기</p>
        </div>
        <div>
          <div className="color10"></div>
          <p>주황색 양말 신기</p>
        </div>
      </MiddleBox>
    </Container>
  );
}
const Container = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #000000;
  width: 240px;
  height: 318px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  margin-top: 25px;
  margin-left: 20px;
  margin-right: 20px;
  align-items: center;
`;

const DayBackground = styled.div`
  p {
    font-family: "NotoSansKR";
    font-style: normal;
    font-weight: ${theme.fontWeight.Regular};
    font-size: 12px;
  }
  .Day {
    background: ${theme.color.AccentColor.DayFill_Click};
    color: ${theme.color.AccentColor.TodayFont};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    line-height: 16px;
    margin-bottom: 8px;
  }
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  div:hover {
    background: ${theme.color.HoverEventColor.EventfillHover};
    border-radius: 4px;
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 13px;
    border-radius: 4px;
    width: 180px;
    height: 30px;

    .greenbox {
      background: ${theme.color.dailyColor.coloradd3};
      width: 10px;
      height: 16px;
      border-radius: 4px;
      margin-right: 1px;
    }
    .color10 {
      background: ${theme.color.dailyColor.daily10};
      width: 10px;
      height: 16px;
      border-radius: 4px;
      margin-right: 1px;
    }

    p {
      font-family: "NotoSansKR";
      margin-left: 6px;
      font-weight: ${theme.fontWeight.Regular};
      font-size: 12px;
      line-height: 17.38px;
    }
  }
`;
