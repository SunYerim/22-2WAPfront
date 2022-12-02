import styled from "styled-components";

import FriendsNotYetList from "../../components/Friends/FriendsNotYetListList";

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 50rem;
  height: calc(100% - 87px);
  margin: 0 auto;
`;
const Content = styled.div`
  border: 0.7rem solid #395b64;
  border-radius: 2rem;
`;
const FriendsNotYet = () => {
  return (
    <Main>
      <Content>
        <FriendsNotYetList />
      </Content>
    </Main>
  );
};

export default FriendsNotYet;
