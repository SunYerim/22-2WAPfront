import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import authClient from "../../apis/authClient";
import { useSelector } from "react-redux";

const Main = styled.div``;

const Wrapper = styled.div`
  width: 500px;
  height: 250px;
  overflow: auto;
  color: #f7f7f7;
`;

const FriendHeader = styled.div`
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr 2fr;
  border-bottom: 3px solid #395b64;
  text-align: center;
  align-items: center;
  font-size: 1.2rem;
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
  border-bottom: 1px solid #395b64;
  text-align: center;
`;
const Rank = styled.div``;
const Name = styled.div``;
const Time = styled.div``;
const Condition = styled.div`
  text-align: center;
  margin: 0 auto;
`;
const Detail = styled.div`
  text-align: right;
  padding-right: 0.5rem;
`;
const DetailBtn = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: #395b64;
  color: #f7f7f7;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const LightImg1 = styled.div`
  background-image: url("/img/light/green.png");
  background-size: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
`;
const LightImg2 = styled.div`
  background-image: url("/img/light/red.png");
  background-size: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
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
              <Time>{data.todayStudyingMinutes}(분)</Time>
              <Condition>
                {data.status === "STUDY" ? <LightImg1 /> : <LightImg2 />}
              </Condition>
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
