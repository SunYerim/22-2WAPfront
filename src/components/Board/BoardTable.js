import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from "react-spinners";

const Body = styled.div`
  display: columns;
  align-items: center;
  margin: 0 auto;
  width: 100rem;
  font-family: SCDream5;
`;

const Loading = styled.div`
  display: ${(prop) => (prop.isLoading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 323px);
  background-color: #f2f2f2;
  opacity: 0.1;
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
const Topic = styled.span``;
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

export default function BoardTable() {
  const param = useParams().keyword;

  // 로딩 여부
  const [loading, setLoading] = useState(false);
  // 애러 여부
  const [error, setError] = useState(null);

  // 글 목록
  const [contentList, setContentList] = useState([]);
  // 페이지
  const [page, setPage] = useState(0);

  const addContent = async () => {
    setPage((prev) => prev + 1);
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get(`/api/post/${param}/${page + 1}`);
      setContentList([...contentList, ...response.data]);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchBoard = async (pagenum) => {
      try {
        setError(null);
        setLoading(true);
        setContentList();
        const response = await axios.get(`/api/post/${param}/${page}`);
        setContentList([...response.data]);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchBoard(page);
  }, [param]);

  if (loading)
    return (
      <Loading isLoading={loading}>
        <BounceLoader color="#36d7b7" size={100} />
      </Loading>
    );
  if (error) return <div style={{ margin: "0 auto" }}>에러가 발생했습니다</div>;

  return (
    <Body>
      <Keywords className="keylist">
        <Header>
          <Num>글 번호</Num>
          <Topic>글 제목</Topic>
          <Category>주제</Category>
          <Writer>작성자</Writer>
          <Like>좋아요 수</Like>
          <Date>작성일자</Date>
        </Header>
        {contentList.map((data) => (
          <Content key={data.id}>
            <Num>{contentList.indexOf(data) + 1}</Num>
            <Topic>
              <Link to={`/board/${page}/${data.category}/${data.id}`}>
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
      <BtnList>
        <MoreBtn onClick={addContent}>10개의 글 더보기</MoreBtn>
      </BtnList>
    </Body>
  );
}
