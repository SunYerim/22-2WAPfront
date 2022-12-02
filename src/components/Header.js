import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  font-size: 2rem;
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

const Navbarlink = styled.div`
  @media only screen and (max-width: 768px) {
    margin: 0 auto;
  }
  > li {
    list-style: none;
  }
`;

const Name = styled.li`
  cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.name.name);

  return (
    <>
      <Navbar>
        <Navbarlogo>
          <Link to="/" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faClock} />
            CodingKing
          </Link>
        </Navbarlogo>
        {userName === "" ? (
          ""
        ) : (
          <Navbarmenu>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                타이머
              </Link>
            </li>
            <li>
              <Link to="/summary" style={{ textDecoration: "none" }}>
                요약 등록
              </Link>
            </li>
            <li>
              <Link to="/board/all" style={{ textDecoration: "none" }}>
                요약 보기
              </Link>
            </li>
            <li>
              <Link to="/friends-list" style={{ textDecoration: "none" }}>
                친구 목록
              </Link>
            </li>
          </Navbarmenu>
        )}

        {userName === "" ? (
          <Navbarlink>
            <div></div>
          </Navbarlink>
        ) : (
          <Navbarlink>
            <Name onClick={() => navigate("/mypage")}>{userName}님</Name>
          </Navbarlink>
        )}
      </Navbar>
    </>
  );
}
