import styled from "styled-components";

const Main = styled.div`
  font-size: 1.4rem;
`;

const Title = styled.div`
  text-align: center;
  font-family: SCDream9;
  font-size: 2rem;
`;

const KeywordTitle = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
const KeywordList = styled.div`
  display: grid;
  padding: 0 2rem;
  margin: 1rem 0;

  grid-template-columns: repeat(6, 12rem);
  grid-row-gap: 2rem;
  justify-content: space-between;
`;
const KeywordBtn = styled.button`
  width: 12rem;
  height: 3rem;
  border: none;

  background-color: #395b64;
  color: #f7f7f7;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const SummaryHeader = (props) => {
  const { keyword, setKeyword } = props;

  const selectKeyword = (e, type) => {
    setKeyword(type);
  };

  return (
    <Main>
      <Title>오늘의 요약</Title>
      <KeywordTitle>요약할 영역 : {keyword}</KeywordTitle>
      <KeywordList>
        <KeywordBtn onClick={(e) => selectKeyword(e, "Front-end")}>
          Front-end
        </KeywordBtn>
        <KeywordBtn onClick={(e) => selectKeyword(e, "Back-end")}>
          Back-end
        </KeywordBtn>
        <KeywordBtn onClick={(e) => selectKeyword(e, "Android")}>
          Android
        </KeywordBtn>
        <KeywordBtn onClick={(e) => selectKeyword(e, "IOS")}>IOS</KeywordBtn>
        <KeywordBtn onClick={(e) => selectKeyword(e, "Algorithm")}>
          Algorithm
        </KeywordBtn>
        <KeywordBtn onClick={(e) => selectKeyword(e, "O.S")}>O.S</KeywordBtn>

        <KeywordBtn onClick={(e) => selectKeyword(e, "Database")}>
          Database
        </KeywordBtn>
        <KeywordBtn onClick={(e) => selectKeyword(e, "C.S")}>C.S</KeywordBtn>
      </KeywordList>
    </Main>
  );
};

export default SummaryHeader;
