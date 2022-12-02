import styled from "styled-components";
import { useEffect } from "react";
import authClient from "./apis/authClient";
import { useState } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BounceLoader, ClipLoader } from "react-spinners";

const Body = styled.div`
  display: columns;
  align-items: center;
  margin: 0 auto;
  width: 100rem;
  height: calc(100% - 87px);
  font-family: SCDream5;
`;

const Title1 = styled.div`
  margin: 1rem 0;
  text-align: center;
  font-size: 2rem;
`;

const Title2 = styled.div`
  margin: 2rem 0;
  text-align: center;
  font-size: 1.7rem;
`;

const Loading = styled.div`
  display: ${(prop) => (prop.isLoading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 87px);
  background-color: #f2f2f2;
  opacity: 0.05;
`;

const Header = styled.ul`
  border-radius: 20px 20px 20px 20px;
  color: #e7f6f2;
  background-color: #395b64;
  font-size: 15px;
  margin-bottom: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;

  display: grid;
  grid-template-columns: 8% 17% 16% 16.5% 11% 11%;

  flex-direction: row;
  justify-content: space-between;
  /*align-items:center;*/

  /*border*/
  border-style: solid;
  border-color: gray;
  border-top-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
`;
const Keywords = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  list-style: none;
  align-items: space-between;
  align-content: center;
  /*margin-right:30px;*/
  width: 95%; /*vh: view hight - 보이는 부분의 100을*/
  padding-left: 0px;
  margin-left: 5vh;

  /*border*/
  border-style: solid;
  border-color: gray;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;

  border-radius: 20px 20px 20px 20px;
`;

const Content = styled.li`
  font-size: 20px;
  margin-bottom: 1px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;

  display: grid;
  grid-template-columns: 3% 20% 20% 20% 7% 15%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /*border*/
  border-style: solid;
  border-color: gray;
  border-top-width: 2px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-radius: 20px 20px 20px 20px;
`;
const Num = styled.b``;
const Topic = styled.span`
  overflow: hidden;
`;
const Category = styled.span``;
const Writer = styled.span``;
const Like = styled.b``;
const Date = styled.b``;

const BtnList = styled.div`
  margin-left: 3.47rem;
`;
const MoreBtn = styled.button`
  width: 16rem;
  height: 4rem;
  border: none;

  background-color: #395b64;
  color: #f7f7f7;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const Mypage = () => {
  const [info, setInfo] = useState({
    id: "",
    points: "",
    nickname: "",
  });

  const [myContent, setMyContent] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // 내 정보 가져오기
  const getMyInfo = async () => {
    try {
      const res = await authClient({
        method: "get",
        url: `${process.env.REACT_APP_LOCAL}/user`,
      });
      setInfo({
        ...info,
        id: res.data.id,
        points: res.data.points,
        nickname: res.data.nickname,
      });
      getMyContent();
    } catch (error) {}
  };

  // 내 글 가져오기
  const getMyContent = async () => {
    try {
      const res = await authClient({
        method: "get",
        url: `${process.env.REACT_APP_LOCAL}/post/my-content/0`,
      });
      setMyContent([...res.data]);
      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  console.log(myContent);

  if (isLoading) {
    return (
      <Loading isLoading={isLoading}>
        <BounceLoader color="#d63661" size={200} />
      </Loading>
    );
  }

  return (
    <Body>
      <>
        <Title1>
          {info.nickname}님의 획득 포인트 : {info.points}
        </Title1>
        <Title2>최근 10개의 작성한 글만 불러옵니다.</Title2>
        <Keywords className="keylist">
          <Header>
            <Num>글 번호</Num>
            <Topic>글 제목</Topic>
            <Category>주제</Category>
            <Writer>작성자</Writer>
            <Like>좋아요 수</Like>
            <Date>작성일자</Date>
          </Header>
          {myContent.map((data) => (
            <Content key={data.id}>
              <Num>{myContent.indexOf(data) + 1}</Num>
              <Topic>
                <Link to={`/board/1/${data.category}/${data.id}`}>
                  {data.topic}
                </Link>
              </Topic>
              <Category>{data.category}</Category>
              <Writer>{data.member}</Writer>
              <Like>♥{data.likes}</Like>
              <Date>{data.dateTime.substr(0, 10)}</Date>
            </Content>
          ))}
        </Keywords>
      </>
    </Body>
  );
};

export default Mypage;
