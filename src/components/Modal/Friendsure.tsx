import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Friendsure() {
  const [friendRequests, setFriendRequests] = useState<
    { id: number; reqMember: { email: string; nickname?: string } }[]
  >([]);
  const [statusMessage, setStatusMessage] = useState(""); 
  useEffect(() => {
    const handleInvite = async () => {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/friends/requests`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const requests = response.data.data.requests;
        console.log(response.data.data.requests);
        setFriendRequests(requests);
      } catch (error) {
        console.error("친구 요청 목록 보기", error);
      }
    };
    handleInvite();
  }, []);
  const handleAccept = async (reqMemberId: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/friends/accept-request`;

    try {
      await axios.post(
        endpoint,
        {
          reqMember: reqMemberId,
          rspMember: localStorage.getItem("email"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setStatusMessage("친구 요청이 승낙되었습니다.");

    } catch (error) {
      console.error("친구 요청 수락 오류:", error);
      setStatusMessage("친구 요청 승낙에 실패했습니다.");

    }
  };

  const handleDelete = async (reqMemberId: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/friends/reject-request`;

    try {
      await axios.patch(
        endpoint,
        {
          reqMember: reqMemberId,
          rspMember: localStorage.getItem("email"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setStatusMessage("친구 요청이 거절되었습니다.");

    } catch (error) {
      setStatusMessage("친구 요청 거절에 실패했습니다.");
      console.error("친구 요청 수락 오류:", error);
    }
  };
  return (
    <MainComponent>
      <h2>친구 요청 목록</h2>
      {statusMessage && <p>{statusMessage}</p>} 
      <ul>
        {friendRequests.map((request) => (
          <FriendRequestItem key={request.id}>
            <span>이름: {request.reqMember.nickname}</span>
            <span>email: {request.reqMember.email}</span>
            <button onClick={() => handleAccept(request.reqMember.email)}>
              승낙
            </button>
            <button onClick={() => handleDelete(request.reqMember.email)}>
              거절
            </button>
          </FriendRequestItem>
        ))}
      </ul>
    </MainComponent>
  );
}

const MainComponent = styled.div`
  width: 30%;
  height: 60%;
  position: absolute;
  top: 20%;
  left: 35%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const FriendRequestItem = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;

  span {
    display: block;
    margin-bottom: 5px;
  }
`;
