import styled from 'styled-components'
import { Editor,Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import ReactMarkdown from "react-markdown";
import { useState, useEffect,useRef} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import settingCookie from "../../utils/settingCookie";

const RegistBtn = styled.button`
  margin-top:20px;
  padding: 0;
  border: none;
  width:80px;
  padding:5px;

  background-color: #395b64;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const Markdown = styled.div`
  // 엔터누르면 \n 적용
  * {
    color:black;
    white-space: pre-wrap;
    word-break: break-all;
  }
  // 기본 글자 크기 작게
  p {
    color:black;
    font-size: 1.4rem;
    margin: 1.6rem 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  ul {
    color:black;
    font-size: 1.4rem;
    padding-left: 2rem;
    margin: 0.5rem 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  h2{
    color:black;
  }
`;

export default function Modify(props){
    const [content, setContent] = useState("");
    const editorRef = useRef();

    const htmlStringtest= props.content;
    editorRef.current?.getInstance().setHTML(htmlStringtest);
    console.log(htmlStringtest);
    const registerSummary = async () => {
        const token = settingCookie("get-access");
    
        try {
          const res = await axios({
            method: "get",
            url: `/api/auth/validate/`,
            data: {
              content: content,
            },
            headers: {
              Authorization: `${token}`,
            },
          });
    
          console.log(res);
        } catch (error) {
          const err = error.response.data;
          console.log(err);
        }
      };

    return(
        <div>
        <Markdown>
        <Editor
        initialValue={htmlStringtest}
            ref={editorRef} // useRef로 DOM 연결
            previewStyle="vertical"
            height="300px"
            initialEditType="markdown"
            toolbarItems={[['bold', 'italic', 'strike']]}
            >
        </Editor>
        </Markdown>
        <Link to="../">
                  <RegistBtn>등록하기</RegistBtn>
        </Link>
        </div>
    )
}