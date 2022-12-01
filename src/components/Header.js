import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Headerbar = styled.div`
  background-color:#2C3333;
  display: flex;
  flex-direction: row;
  justify-content: space-around ;
  flex-wrap: wrap;
  align-content: center;
  height: 30px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #395b64;
  padding: 1rem;
  @media only screen and (max-width: 768px) {
    //width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 24px;
  }
`;

const Navbarlogo = styled.div`
  font-size: 24px;
  justify-content: space-between;
  color: white;
  i {
    color: orange;
  }
  @media only screen and (max-width: 768px) {
    //width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Navbarmenu = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  font-size: 16px;

  li {
    padding: 8px 12px;
  }
  li:hover {
    background-color: #a5c9ca;
  }

  @media only screen and (max-width: 768px) {
    //width: 100%;
    flex-direction: column;
    align-items: center;
    width: 100%;

    li {
      width: 100%;
      text-align: center;
    }
  }
`;

const Navbarlink = styled.div``;

export default function Header() {
  return (
    <>
    <body>
      <Navbar>
        <Navbarlogo>
          <Link to="/" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faClock} />
            CodingKing
          </Link>
        </Navbarlogo>
        <Navbarmenu>
          <li>
            <Link to="/MyAccount" style={{ textDecoration: "none" }}>
              내 타이머
            </Link>
          </li>
          <li>
            <Link to="/summary" style={{ textDecoration: "none" }}>
              게시글 등록
            </Link>
          </li>
          <li>
            <Link to="/board/all/1" style={{ textDecoration: "none" }}>
              게시글 보기
            </Link>
          </li>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              메뉴 추가할 거 있으면
            </Link>
          </li>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              수정해서 써용
            </Link>
          </li>
        </Navbarmenu>
        <Navbarlink>
          <li>홍길동님</li>
        </Navbarlink>
      </Navbar>
    </body>
  </>
  );
}
