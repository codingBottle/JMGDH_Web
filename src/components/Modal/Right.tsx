import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import NewFriend from "./NewFriend";

const Right = () => {
  const [showNewFriend, setShowNewFriend] = useState(false);

  const handleImginClick = () => {
    setShowNewFriend(!showNewFriend);
  };

  const handleOutsideClick = (e) => {
    if (showNewFriend && !e.target.closest(".Imgin")) {
      setShowNewFriend(false);
    }
  };

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
      <div onClick={handleOutsideClick} className="outsideClickArea"></div>
    </Main>
  );
};
const Main = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
const Imgin = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 27px;

  padding: 7px, 8px, 7px, 8px;
  border-radius: 4px;
  border: 1px solid #dbdbdb;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)``;

export default Right;
