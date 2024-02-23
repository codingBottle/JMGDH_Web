// LoginButton.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme/theme";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
export default function Google() {
    return (
        <Container>
          <StyledTable>
            <tbody>
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 5 }).map((_, colIndex) => (
                    <td key={colIndex}>Cell {rowIndex * 5 + colIndex + 1}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </Container>
      );
};
  const Container = styled.div`
  display : flex;
  justify-content: center;
  align-items: center; 
  border: solid 1px gray;
  border-radius:5%;

  height: 470px;
  background-color: black;
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
  }

  tr:nth-child(even){background-color: #f2f2f2;}

  tr:hover {background-color: #ddd;}
`;