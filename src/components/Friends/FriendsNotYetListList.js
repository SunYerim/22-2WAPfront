import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import settingCookie from "../../utils/settingCookie";
import authClient from "../../apis/authClient";

const Main = styled.div`
  overflow: auto;
`;

const Wrapper = styled.div`
  width: 350px;
  height: 250px;
  overflow: auto;
`;

const Header = styled.div`
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AcceptBtn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;

  background-color: #81c6e8;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
`;
const DeclineBtn = styled(AcceptBtn)`
  background-color: #5da7db;
`;

const FriendsNotYetList = () => {
  const [requestFriends, setRequestFriends] = useState([]);
  const [receiveFriends, setReceiveFriends] = useState([]);

  const getList = async () => {
    try {
      const res = await authClient({
        method: "get",
        url: "/api/user/requests",
      });
      console.log(res.data);
      setReceiveFriends(res.data.received);
      setRequestFriends(res.data.requested);
    } catch (error) {
      console.log(error);
    }
  };

  // 친구 요청 수락
  const acceptFriend = async (e, name) => {
    try {
      const token = settingCookie("get-access");
      const res = await axios({
        method: "post",
        url: `/api/user/friend/accept/${name}`,
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.status === 200) {
        setReceiveFriends(receiveFriends.filter((data) => data !== name));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 친구 요청 취소 및 친구 응답 취소
  const declineFriend = async (e, name, type) => {
    try {
      const token = settingCookie("get-access");
      const res = await axios({
        method: "delete",
        url: `/api/user/friend/${name}`,
        headers: {
          Authorization: `${token}`,
        },
      });
      if (res.status === 200) {
        if (type === "receive") {
          setReceiveFriends(receiveFriends.filter((data) => data !== name));
        } else if (type === "request") {
          setRequestFriends(requestFriends.filter((data) => data !== name));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <Main>
      <Wrapper>
        <Header>요청 목록</Header>
        {requestFriends.length === 0
          ? "노 친구"
          : requestFriends.map((data, index) => (
              <Row key={index}>
                <div>
                  {index + 1}. {data}
                </div>
                <div>
                  <DeclineBtn onClick={(e) => declineFriend(e, data, "request")}>x</DeclineBtn>
                </div>
              </Row>
            ))}
      </Wrapper>

      <Wrapper>
        <Header>응답 목록</Header>
        {receiveFriends.length === 0
          ? "노 친구"
          : receiveFriends.map((data, index) => (
              <Row key={index}>
                <div>
                  {index + 1}. {data}
                </div>
                <div>
                  <AcceptBtn onClick={(e) => acceptFriend(e, data)}>o</AcceptBtn>
                  <DeclineBtn onClick={(e) => declineFriend(e, data, "receive")}>x</DeclineBtn>
                </div>
              </Row>
            ))}
      </Wrapper>
    </Main>
  );
};

export default FriendsNotYetList;
