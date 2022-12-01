import styled from 'styled-components'
import { Editor,Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import {Link} from 'react-router-dom';


const ModifyBtn = styled.button`
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
    color:White;
    white-space: pre-wrap;
    word-break: break-all;
  }
  // 기본 글자 크기 작게
  p {
    color:White;
    font-size: 1.4rem;
    margin: 1.6rem 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  ul {
    color:White;
    font-size: 1.4rem;
    padding-left: 2rem;
    margin: 0.5rem 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
  h2{
    color:White;
  }
`;

export default function View(props){
    const htmlStringtest='## 제목 <p>안녕하세요</p>'

    return(
        <>
            <Markdown>
                <Viewer initialValue={props.content}/>
            </Markdown>
            
            <Link to="./modify">
                  <ModifyBtn>수정하기</ModifyBtn>
            </Link>
        </>
    )
}