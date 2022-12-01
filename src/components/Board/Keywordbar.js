import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import KeywordBoardTable from "./KeywordBoardTable";

const Main = styled.div`
  font-size: 1.4rem;
  margin-top: 20px;
  margin-bottom: 50px;
  margin-left: 35px;
  margin-right: 20px;
  /*border*/
  border-style: solid;
  border-color: gray;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;
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
  const [keyword, setKeyword] = useState("전체");

  const selectKeyword = (e, type) => {
    setKeyword(type);
  };

  return (
    <Main>
      <Title> {keyword} 게시판</Title>
      <KeywordTitle>주제선택 : {keyword} </KeywordTitle>
      <KeywordList>
        <Link to="/board/all">
          <KeywordBtn onClick={(e) => selectKeyword(e, "전체")}>All</KeywordBtn>
        </Link>
        <Link to="/board/front-end">
          <KeywordBtn onClick={(e) => selectKeyword(e, "Front-end")}>
            Front-end
          </KeywordBtn>
        </Link>
        <Link to="/board/back-end">
          <KeywordBtn onClick={(e) => selectKeyword(e, "Back-end")}>
            Back-end
          </KeywordBtn>
        </Link>
        <Link to="/board/android">
          <KeywordBtn onClick={(e) => selectKeyword(e, "Android")}>
            Android
          </KeywordBtn>
        </Link>
        <Link to="/board/ios">
          <KeywordBtn onClick={(e) => selectKeyword(e, "IOS")}>IOS</KeywordBtn>
        </Link>
        <Link to="/board/algorithm">
          <KeywordBtn onClick={(e) => selectKeyword(e, "Algorithm")}>
            Algorithm
          </KeywordBtn>
        </Link>
        <Link to="/board/O.S">
          <KeywordBtn onClick={(e) => selectKeyword(e, "O.S")}>O.S</KeywordBtn>
        </Link>
        <Link to="/board/Database">
          <KeywordBtn onClick={(e) => selectKeyword(e, "Database")}>
            Database
          </KeywordBtn>
        </Link>
        <Link to="/board/C.S">
          <KeywordBtn onClick={(e) => selectKeyword(e, "C.S")}>C.S</KeywordBtn>
        </Link>
      </KeywordList>
      {/* <Routes>
        <Route path=":keyword/:pagenum" element={<KeywordBoardTable />}></Route>
      </Routes> */}
    </Main>
  );
};

export default SummaryHeader;
