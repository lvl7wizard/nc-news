import "./App.css";
import { Routes, Route} from "react-router-dom";
import Search from "./components/pages/Search/Search"
import ViewArticle from "./components/pages/ViewArticle/ViewArticle";
import NavBar from "./components/layout/NavBar/NavBar";
import Home from "./components/pages/Home/Home";
import MyAccount from "./components/pages/MyAccount/MyAccount"
import NotFound from "./components/pages/NotFound/NotFound";
import GlobalStyle from "./components/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle/>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/topics/:topic_name" element={<Search />} />
          <Route path="/articles/:article_id" element={<ViewArticle />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
