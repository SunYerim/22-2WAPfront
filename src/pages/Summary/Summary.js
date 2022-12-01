import styled from "styled-components";
import { useState } from "react";

import "../../App.css";
import SummaryHeader from "../../components/Summary/SummaryHeader";
import SummaryContents from "../../components/Summary/SummaryContents";

const Main = styled.div`
  display: flex;
  height: calc(100% - 87px);
  align-items: center;
  margin: 0 auto;
  padding: 1rem 0;
  width: 100rem;
  font-family: SCDream5;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 40rem 40rem;
  column-gap: 5rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 40rem;
    column-gap: 0;
    row-gap: 5rem;
  }
`;

const Content = styled.div`
  width: 100rem;
  padding: 2rem 0;
  border: 0.3rem solid #395b64;
`;

const Summary = () => {
  const [keyword, setKeyword] = useState("Front-end");

  return (
    <Main>
      <Wrapper>
        <Content>
          <SummaryHeader keyword={keyword} setKeyword={setKeyword} />
          <SummaryContents keyword={keyword} />
        </Content>
      </Wrapper>
    </Main>
  );
};

export default Summary;
