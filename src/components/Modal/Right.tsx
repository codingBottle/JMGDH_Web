import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import NewFriend from "./NewFriend";
import Friendsure from "./Friendsure";
import theme from "@/theme/theme";
import axios from "axios";

const profileImageSrc =
  typeof window !== "undefined"
    ? localStorage.getItem("imge") || "/defaultImage.jpg"
    : "/defaultImage.jpg";

const Right = () => {
  const [showNewFriend, setShowNewFriend] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  const handleImginClick = () => {
    setShowNewFriend(!showNewFriend);
  };

  const handleOutsideClick = (e: any) => {
    if (showNewFriend && !e.target.closest(".Imgin")) {
      setShowNewFriend(false);
    }
  };

  const handleLoginBtnClick = () => {
    setShowInvitation((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `https://calendars2.duckdns.org/friends/${localStorage.getItem(
        "email"
      )}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        console.log("친구목록 조회 성공", response.data.data.friends);
        // 여기서 친구 목록을 활용하여 원하는 기능 실행
      } catch (error) {
        console.error("친구목록 조회 오류:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Main>
      <Imgin className="Imgin" onClick={handleImginClick}>
        <StyledImage
          src="/freand.png"
          alt="Friend Image"
          width={28}
          height={28}
        />
      </Imgin>
      {showNewFriend && <NewFriend />}
      {showInvitation && <Friendsure />}
      <div onClick={handleOutsideClick} className="outsideClickArea"></div>
      <div className="friend">
        <div className="friend2">
          <div>
            <p onClick={handleLoginBtnClick}>초대하기</p>
          </div>
          <LoginBtnWrapper
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              overflow: "hidden",
            }}
          >
            <img
              src={profileImageSrc}
              width={30}
              height={30}
              alt="Profile Image"
            />
          </LoginBtnWrapper>
        </div>
      </div>{" "}
      <button onClick={handleLoginBtnClick}>조회</button>
    </Main>
  );
};

const LoginBtnWrapper = styled.a`
  display: block;
  cursor: pointer;
  border: 1px solid ${theme.color.SecondaryColor.ButtonBorder};
  border-radius: 50%;
  background-color: #9927f3;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  .friend {
    margin-top: 32px;
    height: 80%;
  }
  .friend2 {
    display: flex;

    align-items: center;
    flex-direction: column;
    p {
      display: none;
    }
  }

  .friend2:hover div {
    display: block;
    background: #191919b2;
    width: 54px;
    height: 22px;
    top: 77px;
    left: 13px;
    border-radius: 3px;
  }

  .friend2:hover div p {
    padding: 4px 8px;
    color: #ffffff;
    margin: 0;
    font-family: Noto Sans KR;
    font-size: 9px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    display: block;
  }
`;

const Imgin = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 27px;
  padding: 7px 8px 7px 8px;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)``;

export default Right;
