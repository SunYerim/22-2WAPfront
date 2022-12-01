import axios from "axios";
import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import S from "./styled";

const Register = () => {
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 이름
  const onChangeNickName = useCallback((e) => {
    setNickname(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 15) {
      setNameMessage("3글자 이상 15글자 미만으로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMessage(
        "올바른 닉네임 형식입니다 :) 닉네임 사용 여부 확인해주세요."
      );
      setIsName(true);
    }
  }, []);

  //아이디
  const onChangeId = useCallback((e) => {
    const idCurrent = e.target.value;
    setId(idCurrent);
    if (e.target.value.length < 3 || e.target.value.length > 15) {
      setIdMessage("3글자 이상 15글자 미만으로 입력해주세요.");
      setIsId(false);
    } else {
      setIdMessage("올바른 ID 형식입니다.");
      setIsId(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setConfirmPassword(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  //닉네임 사용여부
  const onNickHandler = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `/auth/${nickname}`,
        data: nickname,
      });
      console.log(res);
      return alert("사용가능한 닉네임입니다.");
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const joinUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: "/api/auth/join",
        data: {
          id,
          pw: password,
          nickname,
        },
      });
      console.log(res.data);
      alert("회원가입에 성공했습니다.");
      navigate("/");
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>Register Page</S.Title>
        <S.Form onSubmit={joinUser}>
          <S.formbox>
            <S.TextField
              text="이름"
              type="text"
              typeName="nickname"
              placeholder="Nickname"
              onChange={onChangeNickName}
            />
            <button onClick={onNickHandler}>닉네임 사용 여부</button>
            {nickname.length > 0 && (
              <span className={`message ${isName ? "success" : "error"}`}>
                {nameMessage}
              </span>
            )}
          </S.formbox>

          <S.formbox>
            <S.TextField
              text="아이디"
              type="id"
              typeName="id"
              placeholder="ID"
              onChange={onChangeId}
            ></S.TextField>
            {id.length > 0 && (
              <span className={`message ${isId ? "success" : "error"}`}>
                {idMessage}
              </span>
            )}
          </S.formbox>

          <S.formbox>
            <S.PasswordField
              onChange={onChangePassword}
              passwordText="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
              title="비밀번호"
              type="password"
              placeholder="Password"
            />
            {password.length > 0 && (
              <span className={`message ${isPassword ? "success" : "error"}`}>
                {passwordMessage}
              </span>
            )}
          </S.formbox>

          <S.formbox>
            <S.PasswordField
              onChange={onChangePasswordConfirm}
              passwordText=" "
              title="비밀번호 확인"
              type="password"
              placeholder="Check one more Password"
            />
            {confirmPassword.length > 0 && (
              <span
                className={`message ${isPasswordConfirm ? "success" : "error"}`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </S.formbox>

          <S.SubmitButton type="submit">"Register!"</S.SubmitButton>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
};

export default Register;
