import styled from "styled-components";
import { useState, useEffect } from "react";
import {Link,useParams,useLocation} from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import KeywordBoardTable from "./KeywordBoardTable";


const Main = styled.div`
  font-size: 1.4rem;
  margin-top:20px;
  margin-bottom:50px;
  margin-left:35px;
  margin-right:20px;
  /*border*/
    border-style: solid;
    border-color:gray;
    border-top-width: 2px;
    border-bottom-width:2px;
    border-left-width:2px;
    border-right-width:2px;
`;

const Title = styled.div`
  text-align: center;
  font-family: SCDream9;
  font-size: 2rem;
`;

const KeywordTitle = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
const KeywordList = styled.div`
  display: grid;
  padding: 0 2rem;
  margin: 1rem 0;

  grid-template-columns: repeat(6, 12rem);
  grid-row-gap: 2rem;
  justify-content: space-between;
`;
const KeywordBtn = styled.button`
  width: 12rem;
  height: 3rem;
  border: none;

  background-color: #395b64;
  color: #f7f7f7;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const SummaryHeader = (props) => {
  const [ keyword, setKeyword ] = useState(props.keyword);

  const selectKeyword = (e, type) => {
    setKeyword(type);
  };

  return (
    <Main>
      <Title> {keyword} 게시판</Title>
      <KeywordTitle>주제선택 : {keyword} </KeywordTitle>
      <KeywordList>
        <Link to ="/board/all/1">
            <KeywordBtn onClick={(e) => selectKeyword(e, "전체")}>All
            </KeywordBtn>
        </Link>
        <Link to ="/Front-end/1">
            <KeywordBtn onClick={(e) => selectKeyword(e, "Front-end")}>
                frontend
            </KeywordBtn>
        </Link>
        <Link to ="/Back-end/1">
            <KeywordBtn onClick={(e) => selectKeyword(e, "Back-end")}>
            backend
            </KeywordBtn>
        </Link>
        <Link to ="/Android/1">
            <KeywordBtn onClick={(e) => selectKeyword(e, "Android")}>
            android
            </KeywordBtn>
        </Link>
        <Link to ="/IOS/1">
        <KeywordBtn onClick={(e) => selectKeyword(e, "IOS")}>
            ios
        </KeywordBtn>
        </Link>
        <Link to ="/Algorithm/1">
        <KeywordBtn onClick={(e) => selectKeyword(e, "Algorithm")}>
            algorithm
        </KeywordBtn>
        </Link>
        <Link to ="/OS/1">
        <KeywordBtn onClick={(e) => selectKeyword(e, "O/S")}>
            os
        </KeywordBtn>
        </Link>
        <Link to ="/Database/1">
        <KeywordBtn onClick={(e) => selectKeyword(e, "Database")}>
            db
        </KeywordBtn>
        </Link>
        <Link to ="/C.S/1">
        <KeywordBtn onClick={(e) => selectKeyword(e, "C.S")}>
            cs
        </KeywordBtn>
        </Link>
      </KeywordList>
      <Routes>
        <Route path=":keyword/:pagenum" element={<KeywordBoardTable />}></Route>
      </Routes>
    </Main>
  );
};

export default SummaryHeader;
