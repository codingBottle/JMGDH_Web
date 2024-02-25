import React from "react";
import styled from "styled-components";

export default function GoogleAppsGrid() {
  const apps = [
    { name: "Gmail", url: "https://mail.google.com/mail/?authuser=0" },
    { name: "YouTube", url: "https://www.youtube.com?authuser=0" },
    { name: "검색", url: "https://www.google.com/?authuser=0" },
    { name: "지도", url: "https://maps.google.com/?authuser=0" },
    { name: "Play", url: "https://play.google.com/?authuser=0" },
    { name: "드라이브", url: "https://drive.google.com/?authuser=0" },
    { name: "캘린더", url: "https://calendar.google.com/calendar?authuser=0" },
    {
      name: "비즈니스 프로필 매니저",
      url: "https://business.google.com/?gmbsrc=ww-ww-ot-gs-z-gmb-l-z-h~z-ogb-u&authuser=0",
    },
    { name: "뉴스", url: "https://news.google.com?authuser=0" },
    { name: "Meet", url: "https://meet.google.com?hs=197&authuser=0" },
    { name: "채팅", url: "https://chat.google.com?authuser=0" },
    {
      name: "내 광고 센터",
      url: "https://myadcenter.google.com/?ref=app-launcher&authuser=0",
    },
    {
      name: "쇼핑",
      url: "https://www.google.com/shopping?source=og&authuser=0",
    },
    // 필요하다면 여기에 더 많은 항목을 추가하세요.
  ];

  // 3개씩 분할하여 2차원 배열 생성
  const rows = Array.from(
    { length: Math.ceil(apps.length / 3) },
    (_, rowIndex) => apps.slice(rowIndex * 3, rowIndex * 3 + 3)
  );

  return (
    <Container>
      <StyledTable>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((app, appIndex) => (
                <td key={appIndex}>
                  <a
                    href={app.url}
                    target="_top"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {app.name}
                  </a>
                </td>
              ))}
              {row.length < 3 &&
                Array.from({ length: 3 - row.length }).map((_, emptyIndex) => (
                  <td key={`empty-${emptyIndex}`}></td>
                ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}

const Container = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  border: solid 1px gray;
  border-radius: 5%;
  position: fixed;
  top: 65px;
  left: 67%;
  width: 370px;
  height: 470px;
  background-color: white;
  z-index: 1000;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  td {
    border: 1px solid #ddd;
    text-align: center;
    padding: 8px;
    width: 33%;
  }
  td:hover {
    background-color: #ddd;
    border-radius: 20%;
  }
`;
