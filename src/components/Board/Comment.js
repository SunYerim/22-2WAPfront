import styled from "styled-components";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import CommentTable from "./CommentTable";
import settingCookie from "../../utils/settingCookie";
import authClient from "../../apis/authClient";

const Write = styled.div`
  background-color: #a5c9ca;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  list-style: none;
  align-items: center;
  align-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 5px;

  border-radius: 5px 5px / 5px 5px;
`;
const RegisterBtn = styled.button`
  color: white;
  background-color: #395b64;
  border-radius: 5px 5px / 5px 5px;
  border-color: #2c3333;
  width: 90px;
  height: 40px;
  margin: 10px;
  :focus {
    background-color: #2c3333;
  }
`;

const Profile = styled.span`
  color: #2c3333;
  font-size: 30px;
  padding-left: 10px;
  padding-right: 10px;
`;

const Username = styled.span``;

const CommentContent = styled.span``;

const Reply = styled.ul``;

const Content = styled.textarea.attrs(() => ({
  placeholder: "내용",
}))`
  width: 90%;
  height: 40px;
  resize: none;
  color: black;
`;

const CommentContents = (props) => {
  const [comment, setComment] = useState({
    content: "",
  });

  const changeComment = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const clickTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      let val = e.target.value;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = val.substring(0, start) + "\t" + val.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      changeComment(e);

      return false;
    }
  };
  // 요약 등록
  const registercomment = async () => {
    try {
      const res = await authClient({
        method: "post",
        url: `${process.env.REACT_APP_LOCAL}/post/reply/${props.pageid}`,
        data: {
          id: props.pageid,
          content: comment.content,
        },
      });
      console.log(res);
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  /*const submitHandler = (e)=>{
        e.preventDefault();

        let body = {
            content : comment,
        };

        axios.post(`http://localhost:3001/board/reply/${id}`,body)
        .then((res)=>console.log(res));
    }*/

  return (
    <>
      <Write>
        <Profile>나</Profile>
        <Content
          name="content"
          onChange={changeComment}
          value={comment.content}
          onKeyDown={clickTab}
        ></Content>
        <RegisterBtn onClick={registercomment} type="submit ">
          등록하기
        </RegisterBtn>
      </Write>
      <CommentTable commentcontents={props.commentcontents} />
    </>
  );
};

export default CommentContents;
