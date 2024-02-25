import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import NewFriend from "./NewFriend";
import Friendsure from "./Friendsure";
import theme from "@/theme/theme";
import axios from "axios";
interface Friend {
  id: number;
  member: {
    nickname: string;
    profileImage?: string;
  };
}
const profileImageSrc =
  typeof window !== "undefined"
    ? localStorage.getItem("imge") || "/defaultImage.jpg"
    : "/defaultImage.jpg";

const Right = () => {
  const [showNewFriend, setShowNewFriend] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

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
      const endpoint = `https://calendars2.duckdns.org/friends`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        console.log("친구목록 조회 성공", response.data.data.friends);

        setFriends(response.data.data.friends);
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
          <FriendsList>
            {friends.map((friend, index) => (
              <div key={index}>
                <FriendProfile>
                  <Image
                    src={friend.member.profileImage || "/defaultImage.jpg"} // 친구의 프로필 이미지 또는 기본 이미지
                    alt="Profile Image"
                    width={30}
                    height={30}
                    style={{ borderRadius: "50%" }} // Next.js Image 컴포넌트에 직접 스타일을 적용할 수 없으므로, 아래 styled-components로 대체 가능
                  />
                </FriendProfile>
                <span>{friend.member.nickname}</span>
              </div>
            ))}
          </FriendsList>
        </div>
      </div>{" "}
      <button onClick={handleLoginBtnClick}>조회</button>
    </Main>
  );
};
const FriendsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // 중앙 정렬
  gap: 10px; // 간격 추가
  margin-top: 20px; // 상단 여백 추가
  span {
    font-size: 10px;
  }
`;

const FriendProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;
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
