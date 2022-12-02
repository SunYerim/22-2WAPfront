import styled from "styled-components";
import "../../App.css";

const Container = styled.div`
  width: 45rem;
  max-width: 45rem;
  background-color: #e7f6f2;
  border-radius: 2rem;
  color: #f7f7f7;
  border: 5px solid #395b64;
`;

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const Title = styled.div`
  margin: 2rem 0;
  text-align: center;
  font-size: 3.5rem;
  font-family: SCDream9;
  color: #262626;
`;

const Form = styled.form`
  width: 36rem;
  margin: 0 auto;
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid #e2e8c0;
  width: 100%;
  height: 5rem;
  margin-top: 1rem;
  ::placeholder {
    font-family: SCDream5;
    font-size: 1.5rem;
  }
  border-radius: 1rem;

  font-size: 1.5rem;
  font-family: SCDream5;
  color: #262626;
`;

const LoginButton = styled.button`
  height: 4rem;
  width: 8rem;
  font-family: SCDream5;
  border-radius: 1rem;
  border: none;
  background-color: #395b64;
  color: #f7f7f7;
  cursor: pointer;
`;
const RegisterButton = styled(LoginButton)``;

const snsLogin = styled.a.attrs(() => ({
  href: "http://50.18.213.243:8080/auth/google",
  target: "_blank",
  rel: "noopener noreferrer",
}))`
  background-image: url("/img/auth/google.png");
  background-size: 4rem;
  width: 4rem;
`;

const snsLogin1 = styled(LoginButton)`
  background-image: url("/img/auth/google.png");
  background-size: 4rem;
  width: 4rem;
`;

const snsLogin2 = styled(LoginButton)`
  background-image: url("/img/auth/kakao.png");
  background-size: 4rem;
  background-color: white;
  width: 4rem;
`;

const BtnList = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  column-gap: 1rem;
`;

const snsTitle = styled.div`
  color: #262626;
  text-align: center;
  font-size: 1.6rem;
`;

const S = {
  Container,
  Form,
  Title,
  Input,
  LoginButton,
  RegisterButton,
  snsLogin,
  snsLogin1,
  snsLogin2,
  Wrapper,
  BtnList,
  snsTitle,
};

export default S;
