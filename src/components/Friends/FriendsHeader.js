import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import settingCookie from "../../utils/settingCookie";
import authClient from "../../apis/authClient";

const Main = styled.div`
  height: 100px;
  width: 350px;
`;

const Header = styled.div`
  text-align: center;
  font-size: 1.6rem;
`;

const BtnList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 0.5rem;
  padding-right: 0.5rem;
`;

const Btn = styled.button`
  width: 8rem;
  height: 2.5rem;
  padding: 0;
  border: none;

  background-color: #81c6e8;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const FriendsHeader = () => {
  const navigate = useNavigate();

  // 친구 추가
  const addFriends = async () => {
    const nickname = await Swal.fire({
      title: "친구 추가할 사용자의 닉네임을 입력하세요.",
      input: "text",
    });
    console.log(nickname);

    if (nickname.isConfirmed && nickname.value !== "") {
      try {
        const res = authClient({
          method: "post",
          url: `/api/user/friends/${nickname.value}`,
        });

        console.log(res.data);
      } catch (error) {
        const err = error.response.data;
        console.log(err);
      }
    }
  };

  return (
    <Main>
      <Header>친구목록</Header>
      <BtnList>
        <Btn onClick={addFriends}>친구 추가하기</Btn>
        <Btn onClick={() => navigate("/friends/not-yet")}>요청 / 응답</Btn>
      </BtnList>
    </Main>
  );
};

export default FriendsHeader;
