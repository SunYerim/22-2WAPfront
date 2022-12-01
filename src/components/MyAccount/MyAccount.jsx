import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import S from "./styled";
import Timer from "../MyAccount/Timer/Timer";
import "./Nickchange";
import settingCookie from "../../utils/settingCookie";
import { useDispatch } from "react-redux";

import { GET_NAME } from "../../reducer/nameSlice";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 135px);
`;

const Info = styled.div`
  height: 4.8rem;
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  column-gap: 0.5rem;
`;

const MyAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    settingCookie("remove");
    dispatch(GET_NAME(""));
    navigate("/");
  };

  return (
    <>
      <Info>
        <S.nickCheck type="button" onClick={() => navigate("/nickchange")}>
          닉네임 변경
        </S.nickCheck>
        <S.logout type="button" onClick={logout}>
          로그아웃
        </S.logout>
      </Info>

      <Main>
        <div>
          <Timer />
        </div>
      </Main>
    </>
  );
};

export default MyAccount;
