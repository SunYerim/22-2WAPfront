import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import S from "./styled";
import { Cookies } from "react-cookie";

const Register = () => {
  const [nickname, setNickname] = useState("");
  //const [checknick, setChecknick] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const checkNick = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "/api/auth/validate/{String nickname}",
        data: nickname,
      });
      console.log(res);
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
    return alert("사용가능한 닉네임입니다.");
  };

  const navigate = useNavigate();

  const joinUser = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "/apis/auth/join",
        data: {
          id,
          pw: password,
          nickname,
        },
      });

      console.log(res);
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
    navigate("/Login");
    return alert("Successs Register!");
  };

  return (
    <S.Container>
      <S.Title>Register Page</S.Title>

      <S.Input
        type="text"
        value={nickname}
        onChange={onNicknameHandler}
        placeholder="Nickname"
      />

      <S.Input type="text" placeholder="id" value={id} onChange={onIdHandler} />
      <S.Input
        type="password"
        placeholder="password"
        value={password}
        onChange={onPasswordHandler}
      />
      <S.CheckButton type="button" onClick={checkNick}>
        닉네임 중복 확인
      </S.CheckButton>

      <S.SubmitButton type="submit" onClick={joinUser}>
        "Register!"
      </S.SubmitButton>
    </S.Container>
  );
};

export default Register;
