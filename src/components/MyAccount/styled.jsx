import styled from "styled-components";
import "../../App.css";

const Container = styled.div`
  position: absolute;
  top: 55px;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-direction: column;
`;

const Form = styled.form`
  width: 400px;
  height: 600px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
  margin-top: 67px;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #262626;
`;

const Input = styled.input`
  display: flex;
  border-radius: 8px;
  padding: 10px;
  //margin-top: 8px;
  border: 1px solid #e2e8c0;
  width: 100%;
  height: 50px;

  & + & {
    margin-top: 1rem;
  }
  color: black;
`;

const Content = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const nickCheck = styled.button`
  width: 100px;
  height: 48px;
  border: none;
  font-weight: 700;
  float: right;
  background-color: #395b64;
  border-radius: 64px;
  color: white;
  margin-bottom: 16px;
  text-align: center;
  font-family: SCDream5;
  cursor: pointer;
`;

const logout = styled.button`
  width: 100px;
  height: 48px;
  border: none;
  font-weight: 700;
  float: right;
  font-family: SCDream5;
  background-color: #395b64;
  border-radius: 64px;
  color: white;
  margin-bottom: 16px;
  text-align: center;

  cursor: pointer;
`;

const S = {
  Container,
  Form,
  Content,
  nickCheck,
  logout,
  Title,
  Input,
};

export default S;
