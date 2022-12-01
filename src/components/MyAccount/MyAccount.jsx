import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import S from "./styled";
import Timer from "../MyAccount/Timer/Timer";
import "./Nickchange";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 87px);
`;

const Info = styled.div`
  height: 4.8rem;
  margin-top: 1rem;

  display: flex;
  justify-content: flex-end;
  column-gap: 0.5rem;
`;

const MyAccount = () => {
  const navigate = useNavigate();

  return (
    <Main>
      <div>
        <Info>
          <S.nickCheck type="button" onClick={() => navigate("/nickchange")}>
            닉네임 변경
          </S.nickCheck>
          <S.logout type="button">로그아웃</S.logout>
        </Info>
        <Timer />
      </div>
    </Main>
  );
};

export default MyAccount;
