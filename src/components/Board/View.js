import styled from "styled-components";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Link, useNavigate } from "react-router-dom";

const ViewDiv = styled.div`
  font-size: 1rem;
  .toastui-editor-contents p {
    font-size: 13px;
  }

  .toastui-editor-contents * {
    color: #f7f7f7;
    background-color: #2c3333;
    text-align: left;
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
  width: 80px;
  padding: 5px;

  background-color: #395b64;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
`;

export default function View(props) {
  const navigate = useNavigate();
  return (
    <ViewDiv>
      {props.content === undefined ? (
        ""
      ) : (
        <Viewer initialValue={props.content} />
      )}
      <Btn>
        <ModifyBtn onClick={() => navigate("./modify", { state: props.topic })}>
          수정하기
        </ModifyBtn>
      </Btn>
    </ViewDiv>
  );
}
