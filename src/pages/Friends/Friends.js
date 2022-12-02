import styled from "styled-components";
import FriendsHeader from "../../components/Friends/FriendsHeader";
import FriendsList from "../../components/Friends/FriendsList";

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

const Friends = () => {
  return (
    <Main>
      <Content>
        <FriendsHeader />
        <FriendsList />
      </Content>
    </Main>
  );
};

export default Friends;
