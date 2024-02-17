import React from "react";
import styled from "styled-components";
import theme from "@/theme/theme";

export default function SeeMore() {
  return (
    <Container>
      <TopBox>
        <DayBackground>
          <p className="Day">4</p>
          <p>Tues</p>
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
          <p>아트박스 13시 방문</p>
        </div>
        <div>
          <p>지에스 25 13시 30분 방문</p>
        </div>
        <div>
          <p>구로역 13시 49분 급행 타야함</p>
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
  height: 212px;
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
    background: ${theme.color.AccentColor.TodayFill};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;

    line-height: 16px;
    color: #ffffff;
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
    background: ${theme.color.dailyColor.coloradd3Hover};
    pointer: cursor;
  }
  div {
    background: ${theme.color.dailyColor.coloradd3};
    margin-bottom: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 12px;
    border-radius: 4px;
    width: 180px;
    height: 30px;

    p {
      gap: 10px;
      font-family: "NotoSansKR";

      font-weight: ${theme.fontWeight.Regular};
      font-size: 12px;
      line-height: 17.38px;
    }
  }
`;
