import styled from "styled-components";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import settingCookie from "../../utils/settingCookie";
import { useSelector } from "react-redux";
import authClient from "../../apis/authClient";

const RegistBtn = styled.button`
  margin-top: 20px;
  padding: 0;
  border: none;
  width: 80px;
  padding: 5px;
  font-family: SCDream5;
  background-color: #395b64;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const Main = styled.div`
  font-size: 1rem;

  .toastui-editor-contents p {
    font-size: 13px;
  }

  .toastui-editor-contents * {
    color: #f7f7f7;
    background-color: #2c3333;
  }

  .toastui-editor-md-preview .toastui-editor-contents * {
    color: #f7f7f7;
    text-align: left;
    background-color: #2c3333;
  }

  .toastui-editor-defaultUI-toolbar :nth-child(4) {
    display: none;
  }
  .toastui-editor-toolbar-icons.codeblock {
    display: none;
  }
  .toastui-editor-popup-add-heading * {
    background-color: #2c3333;
    text-align: left;
  }

  .toastui-editor-md-code-block-line-background {
    background-color: #2c3333;
  }

  .toastui-editor-defaultUI-toolbar .scroll-sync::before {
    color: #00a9ff;
  }
`;

export default function Modify(props) {
  // 임시방편으로 닉네임이랑 리덕스 내용 같으면 수정가능
  const userName = useSelector((state) => state.name.name);

  const param = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState({
    content: "",
    topic: "",
  });

  const editorRef = useRef();
  const htmlStringtest = props.content;

  console.log(userName);
  console.log(content);
  const registerSummary = async () => {
    console.log(props.topic);
    console.log(content.content);
    try {
      const res = await authClient({
        method: "post",
        url: `${process.env.REACT_APP_LOCAL}/post/${param.page}/${param.id}`,
        data: {
          topic: props.topic,
          content: content.content,
        },
      });

      console.log(res);
      navigate("/board/all");
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  return (
    <Main>
      <Editor
        initialValue={htmlStringtest}
        ref={editorRef} // useRef로 DOM 연결
        previewStyle="vertical"
        height="300px"
        initialEditType="markdown"
        toolbarItems={[["bold", "italic", "strike"]]}
        onChange={() => {
          setContent({
            ...content,
            content: editorRef.current.getInstance().getMarkdown(),
          });
        }}
      ></Editor>
      <RegistBtn onClick={registerSummary}>수정완료</RegistBtn>
    </Main>
  );
}
