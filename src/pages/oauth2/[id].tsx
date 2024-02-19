import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import axios from "axios";

export default function TokenId() {
  const router = useRouter();
  const [oneTimeUseCode, setOneTimeUseCode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [accectoken, setAccessToken] = useState("");
  const [response, setResponse] = useState("");
  useEffect(() => {
    if (oneTimeUseCode !== null) {
      console.log("나와짜샤 ");
      axios
        .get(
          `https://calendars2.duckdns.org/oauth/token?code=${oneTimeUseCode}`
        )
        .then((response) => {
          setLoading(false);
          localStorage.setItem("accessToken", response?.data?.data.accessToken);
          localStorage.setItem(
            "refreshToken",
            response?.data?.data.refreshToken
          );
          localStorage.setItem("username", response?.data?.data.username);
          console.log(response?.data?.data.username);

          router.push("/test");
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
          setLoading(false);
        });
    }
  }, [oneTimeUseCode]);
  useEffect(() => {
    const code = router.query.oneTimeUseCode;

    if (code) {
      console.log("Received oneTimeUseCode:", code);
      setOneTimeUseCode(code);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [router.query.oneTimeUseCode]);

  return <Wrapper>{loading ? <p>Loading...</p> : <Content></Content>}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 80px);
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 266px;
  height: 100%;
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .calenderNav {
    height: 68px;
    background-color: #999;
  }
`;

const RightSection = styled.div`
  width: 78px;
  height: 100%;
`;

const TodoContainer = styled.div`
  width: 266px;
  height: 598px;
`;
