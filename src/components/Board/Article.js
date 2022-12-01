import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CommentContents from "./Comment";
import Likes from "./Likes";
import Modify from "./Modify";
import View from "./View";
import { Route, Routes } from "react-router-dom";
import "@toast-ui/editor/dist/toastui-editor.css";
import { ClipLoader } from "react-spinners";
import authClient from "../../apis/authClient";

const Main = styled.div`
  display: columns;
  height: calc(100% - 30px);
  align-items: center;
  margin: 0 auto;
  width: 100rem;
  font-family: SCDream5;
`;

const Loading = styled.div`
  display: ${(prop) => (prop.isLoading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  background-color: #f2f2f2;
  opacity: 0.5;
`;

const ArticleHeader = styled.nav`
  /*border*/
  border-style: solid;
  border-color: #395b64;
  border-top-width: 4px;
  border-bottom-width: 4px;
  border-left-width: 4px;
  border-right-width: 4px;

  color: #2c3333;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 15px;

  margin-top: 10px;
`;
const Category = styled.div`
  font-size: 15px;
`;
const Title = styled.div`
  font-size: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const UserName = styled.div`
  font-size: 12px;
`;
const Date = styled.div`
  font-size: 12px;
`;
const Content = styled.article`
  margin-top: 10px;
  margin-left: 0px;
  margin-right: 0px;

  /*border*/
  border-style: solid;
  border-color: gray;
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-right-width: 2px;

  border-radius: 5px 5px / 5px 5px;

  padding: 15px;
`;

const ReplyBox = styled.div`
  margin-top: 10px;
  font-size: 15px;
`;

const Article = () => {
  let { id } = useParams();

  console.log(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 글 관련 정보 저장
  const [content, setContent] = useState();
  const [htmlString, setHtmlString] = useState();

  const [replypage, setReplyPage] = useState(1);
  const [liked, setLiked] = useState(false);

  // 댓글
  const [replycontent, setReplyContent] = useState(null);

  useEffect(() => {
    const fetchContent = async (id, replypage) => {
      const response = await authClient({
        method: "get",
        url: `/api/post/view/${id}/${replypage - 1}`,
      });

      setContent(response.data.post);
      setReplyContent(response.data.comments);
      setLiked(response.data.likePressed);
    };
    fetchContent(id, replypage);
  }, []);

  useEffect(() => {
    if (content !== undefined) {
      setHtmlString(content.content);
    }
  }, [content]);

  if (loading)
    return (
      <Loading isLoading={loading}>
        <ClipLoader color="#36d7b7" />
      </Loading>
    );
  if (error) return <div>에러가 발생했습니다</div>;
  if (!content) return null;
  return (
    <>
      <Main key={content.id}>
        <ArticleHeader classname="article">
          <Category>
            <Link to>
              {content.category} {">"}
            </Link>
          </Category>
          <Title>{content.topic}</Title>
          <UserName>작성자 : {content.member}</UserName>
          <Date>{content.date}</Date>
        </ArticleHeader>
        <Content>
          <View content={htmlString} user={content.member} />

          <Routes>
            <Route path=":modify" element={<Modify content={htmlString} topic={content.topic} />} />
          </Routes>
        </Content>
        <Likes count={content.likes} likepressed={liked} id={content.id} />
        <ReplyBox>
          <div>댓글작성</div>
          <CommentContents commentcontents={replycontent} pageid={content.id} />
        </ReplyBox>
      </Main>
    </>
  );
};
export default Article;
/**/
