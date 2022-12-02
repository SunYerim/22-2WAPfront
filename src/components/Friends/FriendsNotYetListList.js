import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import settingCookie from "../../utils/settingCookie";
import authClient from "../../apis/authClient";

const Main = styled.div`
  overflow: auto;
  color: #f7f7f7;
`;

const Wrapper = styled.div`
  width: 500px;
  height: 250px;
  overflow: auto;
`;

const Header = styled.div`
  text-align: center;
  font-size: 2rem;
  height: 4rem;
  line-height: 4rem;
  border-bottom: 3px solid #395b64;
`;

const NoFriend = styled.div`
  display: flex;
  height: calc(250px - 4rem);
  align-items: center;
  font-size: 1.6rem;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  font-size: 1.6rem;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div``;
const BtnList = styled.div``;

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
        url: `${process.env.REACT_APP_LOCAL}/user/requests`,
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
        url: `${process.env.REACT_APP_LOCAL}/user/friend/accept/${name}`,
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
        url: `${process.env.REACT_APP_LOCAL}/user/friend/${name}`,
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
        {requestFriends.length === 0 ? (
          <NoFriend>요청 목록이 없어요.</NoFriend>
        ) : (
          requestFriends.map((data, index) => (
            <Row key={index}>
              <Name>
                {index + 1}. {data}
              </Name>
              <BtnList>
                <DeclineBtn onClick={(e) => declineFriend(e, data, "request")}>
                  x
                </DeclineBtn>
              </BtnList>
            </Row>
          ))
        )}
      </Wrapper>

      <Wrapper>
        <Header>응답 목록</Header>
        {receiveFriends.length === 0 ? (
          <NoFriend>응답 목록이 없어요.</NoFriend>
        ) : (
          receiveFriends.map((data, index) => (
            <Row key={index}>
              <Name>
                {index + 1}. {data}
              </Name>
              <BtnList>
                <AcceptBtn onClick={(e) => acceptFriend(e, data)}>o</AcceptBtn>
                <DeclineBtn onClick={(e) => declineFriend(e, data, "receive")}>
                  x
                </DeclineBtn>
              </BtnList>
            </Row>
          ))
        )}
      </Wrapper>
    </Main>
  );
};

export default FriendsNotYetList;
