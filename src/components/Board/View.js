import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const ViewDiv = styled.div`
  font-size: 1rem;
  font-family: SCDream5;
  .toastui-editor-contents p {
    font-size: 13px;
  }

  .toastui-editor-contents * {
    color: #f7f7f7;
    background-color: #2c3333;
    text-align: left;
    font-family: SCDream5;
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

const Btn = styled.div`
  margin-top: 1rem;
`;

const ModifyBtn = styled.button`
  padding: 0;
  border: none;
  width: 100px;
  padding: 5px;
  font-family: SCDream5;
  background-color: #395b64;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
`;

export default function View(props) {
  const navigate = useNavigate();

  // 임시방편으로 이름을 가져와 같을때만 수정버튼 보이게
  const dispatch = useSelector((state) => state.name.name);

  return (
    <ViewDiv>
      {props.content === undefined ? "" : <Viewer initialValue={props.content} />}
      {props.user !== dispatch ? (
        ""
      ) : (
        <Btn>
          <ModifyBtn onClick={() => navigate("./modify", { state: props.topic })}>글 수정하기</ModifyBtn>
        </Btn>
      )}
    </ViewDiv>
  );
}
