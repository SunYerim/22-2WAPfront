import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Swal from "sweetalert2";
import authClient from "../../apis/authClient";

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
  display: flex;
  column-gap: 2rem;
`;

const ModifyBtn = styled.button`
  padding: 0;
  border: none;
  width: 100px;
  padding: 5px;
  font-family: SCDream5;
  background-color: #395b64;
  color: #f7f7f7;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const DeleteBtn = styled(ModifyBtn)``;

export default function View(props) {
  const navigate = useNavigate();

  // 임시방편으로 이름을 가져와 같을때만 수정버튼 보이게
  const dispatch = useSelector((state) => state.name.name);

  const deleteContent = async () => {
    const nickname = await Swal.fire({
      title: "정말 삭제하시겠습니까?",
      showCancelButton: true,
    });
    if (nickname.value === true) {
      try {
        const res = await authClient({
          method: "delete",
          url: `${process.env.REACT_APP_LOCAL}/post/${props.id}`,
        });
        await Swal.fire({
          title: "정상적으로 삭제하였습니다.",
          icon: "success",
        });
        navigate("/board/all");
      } catch (error) {}
    }
  };

  return (
    <ViewDiv>
      {props.content === undefined ? (
        ""
      ) : (
        <Viewer initialValue={props.content} />
      )}
      {props.user !== dispatch ? (
        ""
      ) : (
        <Btn>
          <ModifyBtn
            onClick={() => navigate("./modify", { state: props.topic })}
          >
            수정하기
          </ModifyBtn>
          <DeleteBtn onClick={deleteContent}>삭제하기</DeleteBtn>
        </Btn>
      )}
    </ViewDiv>
  );
}
