import "./App.css";
import { Routes, Route} from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import NavBar from "./components/layout/NavBar/NavBar";
import Background from "./components/layout/Background/Background";
import Home from "./components/pages/Home/Home";
import Search from "./components/pages/Search/Search"
import ViewArticle from "./components/pages/ViewArticle/ViewArticle";
import Post from "./components/pages/Post/Post";
import MyArticles from "./components/pages/MyArticles/MyArticles";
import MyAccount from "./components/pages/MyAccount/MyAccount"
import NotFound from "./components/pages/NotFound/NotFound";

function App() {
  return (
    <>
      <GlobalStyle/>
      <NavBar />
      <Background/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/topics/:topic_name" element={<Search />} />
          <Route path="/articles/:article_id" element={<ViewArticle />} />
          <Route path="/post" element={<Post/>}></Route>
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/myarticles" element={<MyArticles />} />   
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
