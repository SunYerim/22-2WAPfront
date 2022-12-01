import styled from "styled-components";
import axios from "axios";
import settingCookie from "../../utils/settingCookie";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import authClient from "../../apis/authClient";

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

const Title = styled.input.attrs(() => ({
  placeholder: "제목을 입력하세요.",
}))`
  width: 40rem;
  height: 3rem;
  margin: 1rem 0 1rem 1rem;

  border: 1px solid #f7f7f7;
  font-size: 1.5rem;
  color: #f7f7f7;
  background-color: inherit;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #f7f7f7;
  }
`;

const RegisterBtn = styled.button`
  background-color: #395b64;
  border: none;
  border-radius: 0.5rem;
  font-family: SCDream5;
  width: 10rem;
  height: 3rem;
  cursor: pointer;
`;

const BtnList = styled.div`
  margin: 2rem 0 0 2rem;
`;

const SummaryContents = (props) => {
  const navigate = useNavigate();

  const { keyword } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef();

  // 제목 변경
  const changeTitle = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  // 요약 등록
  const registerSummary = async () => {
    if (title === "" || content === "") {
      alert("제목과 내용을 입력하세요.\n");
      return;
    }
    try {
      const res = await authClient({
        method: "post",
        url: `/api/post/${keyword}`,
        data: {
          topic: title,
          content: content,
        },
      });
      navigate("/");
      console.log(res);
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  return (
    <Main>
      <Title value={title} onChange={changeTitle}></Title>
      <Editor
        initialValue="### 내용을 입력하세요."
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={false}
        ref={editorRef}
        onChange={() => {
          const content = editorRef.current.getInstance().getMarkdown();
          setContent(content);
        }}
      />
      <BtnList>
        <RegisterBtn onClick={registerSummary}>등록하기</RegisterBtn>
      </BtnList>
    </Main>
  );
};

export default SummaryContents;
