import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import settingCookie from "../../utils/settingCookie";
import authClient from "../../apis/authClient";

const Stat = styled.div`
  display: flex;
  align-items: center;
  height: 4rem;
`;

const StatName = styled.div`
  width: 6rem;
  margin-left: 1rem;
`;

const StatPoints = styled.div`
  width: 2rem;
`;

const StatPlusBtn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;

  background-color: #395b64;
  color: white;
  cursor: pointer;
  border-radius: 0.5rem;
`;

const Likes = (props) => {
  const navigate = useNavigate();
  const [likepoint, setlikePoint] = useState(props.count);
  const [liked, setLiked] = useState(props.likepressed);

  const sendliked = async () => {
    try {
      const res = await authClient({
        method: "post",
        url: `/api/post/likes/${props.id}`,
        data: {
          id: props.id,
        },
      });

      console.log(res);
    } catch (error) {
      const err = error.response.data;
      console.log(err);
    }
  };

  const addPoints = () => {
    if (liked) {
      setlikePoint(likepoint - 1);
      setLiked(false);
      alert("좋아요가 취소되었습니다.:>");
    } else {
      setlikePoint(likepoint + 1);
      setLiked(true);
    }
    sendliked();
  };

  return (
    <Stat>
      <StatName>좋아요</StatName>
      <StatPoints>{likepoint}</StatPoints>
      <StatPlusBtn name="like" onClick={addPoints}>
        ♥
      </StatPlusBtn>
    </Stat>
  );
};
export default Likes;
