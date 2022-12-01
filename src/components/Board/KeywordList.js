import styled from "styled-components";
import apiClient from "../../libs/api/apiClient";
import { useState, useEffect } from "react";
import UserAPI from "../../libs/api/user";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

const Keywords = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  align-items: space-between;
  align-content: center;
  margin-right: 30px;
  width: 95%; /*vh: view hight - 보이는 부분의 100을*/
`;

const Content = styled.li`
  font-size: 20px;
  margin-bottom: 1px;
  padding-top: 5px;
  padding-bottom: 5px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /*border*/
  border-style: solid;
  border-color: gray;
  border-top-width: 0px;
  border-bottom-width: 2px;
  border-left-width: 0px;
  border-right-width: 0px;
`;

const Word = styled.span`
  font-size: 20px;
  margin-right: 20px;
`;

export default function KeywordList() {
  const [keywordList, setKeywordList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = keywordList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <>
      <Keywords className="keylist">
        {currentPosts.map((Key) => (
          <Content key={Key.key}>
            <Word>
              <Link to={`/keyword/${Key.key}`}>{Key.key}</Link>
            </Word>
          </Content>
        ))}
      </Keywords>
      <Pagination postPerPage={postPerPage} totalPosts={keywordList.length} paginate={paginate} />
    </>
  );
}
