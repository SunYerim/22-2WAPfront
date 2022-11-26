import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import S from "./styled";
import Timer from "../MyAccount/Timer/Timer";
import axios from "axios";

const MyAccount = () => {
  const navigate = useNavigate();
  const [nickname, setnickname] = useState("");
  const changeNick = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "/apis/users/{nickname}",
        data: {
          nickname,
        },
      });
      if (res.data.status === 200) {
        console.log("success"); // response 부분 수정 필요
      }
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };
  const navigateToLogin = () => {
    navigate("/Login");
    return alert("See you soon");
  };
  return (
    <div>
      <div>
        <S.CheckButton type="button" onClick={navigateToLogin}>
          로그아웃
        </S.CheckButton>
        <S.nickChangeButton type="button" onClick={changeNick}>
          닉네임 변경
        </S.nickChangeButton>
      </div>

      <Timer />
    </div>
  );
};

export default MyAccount;
