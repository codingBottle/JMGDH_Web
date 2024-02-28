import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Friendsure() {
  const [friendRequests, setFriendRequests] = useState<
    { id: number; reqMember: { email: string; nickname?: string } }[]
  >([]);

  useEffect(() => {
    const handleInvite = async () => {
      const endpoint = "https://calendars2.duckdns.org/friends/requests";

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
  }, [friendRequests]);
  const handleAccept = async (reqMemberId: string) => {
    const endpoint = "https://calendars2.duckdns.org/friends/accept-request";

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

      // 수락 후에 친구 요청 목록을 갱신하거나 다른 로직을 수행할 수 있습니다.
    } catch (error) {
      console.error("친구 요청 수락 오류:", error);
    }
  };

  const handleDelete = async (reqMemberId: string) => {
    const endpoint = "https://calendars2.duckdns.org/friends/reject-request";

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
    } catch (error) {
      console.error("친구 요청 수락 오류:", error);
    }
  };
  return (
    <MainComponent>
      <h2>친구 요청 목록</h2>
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
