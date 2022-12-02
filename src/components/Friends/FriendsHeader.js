import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authClient from "../../apis/authClient";
import { useSelector } from "react-redux";

const Main = styled.div`
  height: 100px;
  width: 500px;
`;

const Header = styled.div`
  text-align: center;
  font-size: 1.6rem;
  margin: 1rem auto;
`;

const BtnList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 0.5rem;
  padding-right: 0.5rem;
`;

const Btn = styled.button`
  width: 10rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  font-family: SCDream5;
  background-color: #395b64;
  color: #f7f7f7;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const FriendsHeader = () => {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.name.name);

  // 친구 추가
  const addFriends = async () => {
    const nickname = await Swal.fire({
      title: "친구 추가할 사용자의 닉네임을 입력하세요.",
      input: "text",
    });

    if (nickname.isConfirmed && nickname.value !== "") {
      if (nickname.value === userName) {
        Swal.fire({
          title: "자기자신은 영원한 친구입니다.",
          icon: "info",
        });
        return;
      }
    }

    if (nickname.isConfirmed && nickname.value !== "") {
      try {
        const res = await authClient({
          method: "post",
          url: `${process.env.REACT_APP_LOCAL}/user/friend/${nickname.value}`,
        });
        console.log(res);
      } catch (error) {
        const err = error.response.data;
        console.log(error.response);
        if (error.response.status === 400) {
          Swal.fire({
            title: "존재하지 않는 사용자입니다.",
            icon: "warning",
          });
        } else if (error.response.status === 500) {
          Swal.fire({
            title: "친구이거나 이미 요청/응답 목록에 있어요.",
            icon: "warning",
          });
        }
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
