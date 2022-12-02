import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import authClient from "../../apis/authClient";

const Main = styled.div``;

const Wrapper = styled.div`
  width: 350px;
  height: 250px;
  overflow: auto;
`;

const FriendHeader = styled.div`
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr 2fr;
  border-bottom: 1px solid black;
  text-align: center;
  align-items: center;
`;
const RankTitle = styled.div``;
const NameTitle = styled.div``;
const TimeTitle = styled.div``;
const ConditionTitle = styled.div``;
const DetailTitle = styled.div`
  text-align: right;
  padding-right: 0.5rem;
`;

const NoFriend = styled.div`
  display: flex;
  height: 22rem;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
`;

const Friend = styled.div`
  height: 3rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 4fr 2fr 2fr 2fr;
  border-bottom: 1px solid gray;
  text-align: center;
`;
const Rank = styled.div``;
const Name = styled.div``;
const Time = styled.div``;
const Condition = styled.div``;
const Detail = styled.div`
  text-align: right;
  padding-right: 0.5rem;
`;
const DetailBtn = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: #81c6e8;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const Page = styled.div`
  display: grid;
  width: 15rem;
  height: 3rem;
  align-items: center;
  margin: 0 auto;
  grid-template-columns: repeat(8, 1fr);
`;

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  // 친구 목록 불러오기
  const getFriends = async () => {
    try {
      const res = await authClient({
        method: "get",
        url: `${process.env.REACT_APP_LOCAL}/user/friend`,
      });
      setFriends(res.data);
      console.log(res.data);
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  console.log(friends.length);

  return (
    <Main>
      <Wrapper>
        <FriendHeader>
          <RankTitle>순위</RankTitle>
          <NameTitle>이름</NameTitle>
          <TimeTitle>공부 시간</TimeTitle>
          <ConditionTitle>상태</ConditionTitle>
          <DetailTitle>자세히</DetailTitle>
        </FriendHeader>
        {friends.length === 0 ? (
          <NoFriend>친구가 없어요... 😂 </NoFriend>
        ) : (
          friends.map((data) => (
            <Friend key={data.index}>
              <Rank>{data.index}.</Rank>
              <Name>{data.nickname}</Name>
              <Time>{data.todayStudyingMinutes}</Time>
              <Condition>{data.status}</Condition>
              <Detail>
                <DetailBtn>+</DetailBtn>
              </Detail>
            </Friend>
          ))
        )}
      </Wrapper>
    </Main>
  );
};

export default FriendsList;
