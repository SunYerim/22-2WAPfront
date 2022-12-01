import styled from 'styled-components';
import { useState, useEffect,useRef} from "react";
import axios from 'axios';
import {Link,useParams} from 'react-router-dom';
import CommentContents from './Comment';
import Likes from'./Likes';
import Modify from './Modify';
import View from './View';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import settingCookie from "../../utils/settingCookie";


const Main = styled.div`
  display: columns;
  height: calc(100% - 30px);
  align-items: center;
  margin: 0 auto;
  width: 100rem;
  font-family: SCDream5;
`;
const ArticleHeader = styled.nav`
  /*border*/
  border-style: solid;
  border-color:#395B64;
  border-top-width: 4px;
  border-bottom-width:4px;
  border-left-width:4px;
  border-right-width:4px;

  color:#2C3333;
  padding-left:20px;
  padding-top:15px;
  padding-bottom:15px;

  margin-top:10px;
`
const Category = styled.div`
  font-size:15px;
`
const Title = styled.div`
  font-size:30px;
  padding-top:5px;
  padding-bottom:5px;
`
const UserName = styled.div`
  font-size:12px;
`
const Date = styled.div`
  font-size:12px;
`
const Content = styled.article`
  margin-top:10px;
  margin-left:0px;
  margin-right:0px;

  /*border*/
  border-style: solid;
  border-color:gray;
  border-top-width: 2px;
  border-bottom-width:2px;
  border-left-width:2px;
  border-right-width:2px;

  border-radius: 5px 5px / 5px 5px;

  padding:15px;
  

`

const ReplyBox = styled.div`
  margin-top:10px;
  font-size:15px;
`


const Markdown = styled.div`
  // 엔터누르면 \n 적용
  * {
    color:white;
    white-space: pre-wrap;
    word-break: break-all;
  }
  // 기본 글자 크기 작게
  p {
    color:white;
    font-size: 1.4rem;
    margin: 1.6rem 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  ul {
    color:white;
    font-size: 1.4rem;
    padding-left: 2rem;
    margin: 0.5rem 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  h2{
    color:white;
  }
`;


const Article=()=>{
    let {id} = useParams();

    const [content, setContent] = useState();
    const [replypage,setReplyPage] = useState(1);
    const [liked,setLiked]=useState(false);
    const [replycontent,setReplyContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const TurndownService =require('turndown').default
    const turndownService = new TurndownService();

    const editorRef = useRef();
    

    useEffect(() => {
      const token = settingCookie("get-access");
      const fetchContent = async (id,replypage) => {
          const response = await axios({
            method:"get",
            url:`/api/post/view/${id}/${replypage-1}`,
            headers: {
                Authorization:`${token}`,
            },
      });
  
          console.log(response.data);
          setContent(response.data.post);
          setReplyContent(response.data.comments);
          setLiked(response.data.likePressed);

          
        }
        fetchContent(id,replypage);
    },[]);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!content) return null;

    const htmlString = `${content.content}`
    editorRef.current?.getInstance().setHTML(htmlString);
    
    const htmlStringtest='## 제목'
    const htmlStringtest2='## 제목 <p>내용</p>'
    editorRef.current?.getInstance().setHTML(htmlStringtest);

    return(
        <>
            <Main key = {content.id}>
              <ArticleHeader classname = "article">
                <Category>
                  <Link to>{content.category} {'>'}</Link>
                </Category>
                <Title>
                  {content.topic}
                </Title>
                <UserName>
                  작성자 : {content.member}
                </UserName>
                <Date>
                  {content.date}
                </Date>
              </ArticleHeader>
              <Content>
              <Routes>
                <Route path=":modify" element={<Modify content={htmlStringtest}/>}/>
                <Route path="" element={<View content={htmlStringtest2}/>}/>
              </Routes>
                
              </Content>
              <Likes
                count={content.likes}
                likepressed={liked}
                id = {content.id}/>
              <ReplyBox>
                <div>댓글작성</div>
                <CommentContents
                  commentcontents={replycontent}
                  pageid={content.id}
                  />
              </ReplyBox>

            </Main>
        </>
    );
}
export default Article;
/**/
