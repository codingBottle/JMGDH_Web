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
    email: string;
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
  const [accessTokenExists, setaccessTokenExists] = useState(false);
  const [imageExists, setimageExists] = useState(false);
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
    const accessToken = localStorage.getItem("accessToken");
    const image = localStorage.getItem("imge");

    setaccessTokenExists(!!accessToken);
    setimageExists(!!image);

    if (accessToken) {
      const fetchData = async () => {
        const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/friends`;

        try {
          const response = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log("친구목록 조회 성공", response.data.data.friends);
          setFriends(response.data.data.friends);
        } catch (error) {
          console.error("친구목록 조회 오류:", error);
        }
      };

      fetchData();
    } else {
      console.log("accessToken이 없어 친구목록을 조회할 수 없습니다.");
    }
  }, []);

  const deleteFriend = async (friendEmail: string) => {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!isConfirmed) {
      console.log("친구 삭제가 취소되었습니다.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("accessToken이 없습니다.");
      return;
    }

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/friends/${friendEmail}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.member.email !== friendEmail)
      );
      console.log(`${friendEmail} 삭제 성공`);
    } catch (error) {
      console.error("친구 삭제 오류:", error);
    }
  };

  return (
    <Main>
      {accessTokenExists && imageExists && (
        <Imgin className="Imgin" onClick={handleImginClick}>
          <StyledImage
            src="/freand.png"
            alt="Friend Image"
            width={28}
            height={28}
          />
        </Imgin>
      )}
      {accessTokenExists && imageExists && (
        <>
          {showNewFriend && <NewFriend />}
          {showInvitation && <Friendsure />}
          <div onClick={handleOutsideClick} className="outsideClickArea"></div>
          <div className="friend">
            <div className="friend2" onClick={handleLoginBtnClick}>
              <div>
                <p >초대하기</p>
              </div>
              <LoginBtnWrapper
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30,
                  overflow: "hidden",
                }}>
                <Image
                  src={profileImageSrc}
                  width={30}
                  height={30}
                  alt="Profile Image"
                  className="img_friend"
                />
              </LoginBtnWrapper>
            </div>
            <FriendsList>
              {friends.map((friend, index) => (
                <div key={index}>
                  <FriendProfile>
                    <Image
                      onClick={() => deleteFriend(friend.member.email)}
                      src={friend.member.profileImage || ""}
                      alt="Profile Image"
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%" }}
                    />
                  </FriendProfile>

                  <span>{friend.member.nickname}</span>
                </div>
              ))}
            </FriendsList>
          </div>
        </>
      )}
    </Main>
  );
};
const FriendsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  span {
    font-size: 10px;
  }
`;

const FriendProfile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  .img_friend &:hover {
    pointer-events: none;
  }
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
  width: 3vw;
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
