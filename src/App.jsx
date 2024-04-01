import "./App.css";
import { Routes, Route} from "react-router-dom";
import Search from "./components/Search";
import ViewArticle from "./components/ViewArticle";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import MyAccount from "./components/MyAccount";
import NotFound from "./components/NotFound";
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
      <Footer />
    </>
  );
}

export default App;
