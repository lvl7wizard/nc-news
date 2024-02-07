import './App.css'
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search'
import ViewArticle from './components/ViewArticle';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import MyAccount from './components/MyAccount';


function App() {

  return (
    <>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Search />} />
      <Route path="/articles/:article_id" element={<ViewArticle />} />
      <Route path="/myaccount" element={<MyAccount />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App;