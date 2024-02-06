import './App.css'
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search'
import ViewArticle from './components/ViewArticle';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';


function App() {

  return (
    <>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Search />} />
      <Route path="/articles/:article_id" element={<ViewArticle />} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App;