import Header from "./components/Header";
import TodayRank from "./pages/Ranking/TodayRanking";
import CorsArticle from "./pages/Board/CorsArticle";
import AllContent from "./pages/Board/AllContent";
import KeyContent from "./pages/Board/KeyContent";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import Stats from "./pages/Stats/Stats";
import Summary from "./pages/Summary/Summary";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAccountPage from "./pages/MyAccountPage";
import UserList from "./components/Ranking/UserList";
import Pagination from "./components/Pagination";
import Friends from "./pages/Friends/Friends";
import Footer from "./pages/Footer/Footer";
import NickChangePage from "./pages/NickChangePage";
import axios from "axios";
import FriendsNotYet from "./pages/Friends/FriendsNotYet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import settingCookie from "./utils/settingCookie";

import jwt_decode from "jwt-decode";
import { GET_NAME } from "./reducer/nameSlice";

const AllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.name.name);

  const isLogin = () => {
    const token = settingCookie("get-access");
    // 로그인이 되어있다면
    if (token !== undefined) {
      const decode = jwt_decode(token);
      dispatch(GET_NAME(decode.nickname));
    }
  };

  useEffect(() => {
    isLogin();
  }, []);

  return (
    <AllWrapper>
      <GlobalStyle />
      <ContentWrapper>
        <Header />
        <Routes>
          {userName !== "" ? (
            <Route path="/" element={<MyAccountPage />} />
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/nickchange" element={<NickChangePage />} />
          <Route path="/stats" element={<Stats />}></Route>
          <Route path="/summary" element={<Summary />}></Route>
          <Route path="/header" element={<Header />}></Route>
          <Route path="/userlist" element={<UserList />}></Route>
          <Route path="/rank" element={<TodayRank />}></Route>
          <Route path="/board/:keyword/*" element={<AllContent />}></Route>
          <Route
            path="/board/:keyword/:page/:id/*"
            element={<CorsArticle />}
          ></Route>
          <Route path="/test" element={<UserList />}></Route>
          <Route path="/friends-list" element={<Friends />}></Route>
          <Route path="/friends/not-yet" element={<FriendsNotYet />}></Route>
        </Routes>
        {/* <Route path="/:keyword/:pagenum" element={<KeyContent />}></Route> */}
      </ContentWrapper>
      <Footer />
    </AllWrapper>
  );
}
export default App;
