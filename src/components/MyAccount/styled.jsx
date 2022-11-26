import styled, { css } from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 40px;
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

const Content = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CheckButton = styled.button`
  width: 100px;
  height: 35px;
  border: none;
  font-weight: 700;
  background-color: #395b64;
  border-radius: 64px;
  color: white;
  float: right;
  margin-bottom: 16px;
  text-align: center;

  cursor: pointer;
`;

const nickChangeButton = styled.button`
  width: 100px;
  height: 35px;
  border: none;
  font-weight: 700;
  background-color: #395b64;
  border-radius: 64px;
  color: white;
  float: right;
  margin-bottom: 16px;
  text-align: center;

  cursor: pointer;
`;
const S = {
  Container,
  Content,
  Form,
  CheckButton,
  nickChangeButton,
};

export default S;
