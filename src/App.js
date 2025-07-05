import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Header from "./component/Header";
import Footer from "./component/Footer";
import Main from "./page/Main";
import Guide from "./page/Guide";
import MoodCheck from "./page/MoodCheck";
import Music from "./page/Music";
import Movie from "./page/Movie";
import MoodSurvey from "./page/MoodSurvey";
import Login from "./component/Login";
import Join from "./component/Join";
import Calendar from "./page/Calendar";
import Detail from "./page/Detail";
import Contact from "./page/Contact";
import Loading from "./page/Loading";
import MusicResult from "./page/MusicResult";
import MovieResult from "./page/MovieResult";

function App() {
    useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // scroll 속도
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -7 * t)), // 감속 느낌
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/About" element={<Guide />} />
          <Route path="/MoodCheck" element={<MoodCheck />} />
          <Route path="/Music" element={<Music />} />
          <Route path="/Movie" element={<Movie />} />
          <Route path="/Survey" element={<MoodSurvey />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Detail/:date" element={<Detail />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Loading/:type" element={<Loading />} />
          <Route path="/MusicResult" element={<MusicResult />} />
          <Route path="/MovieResult" element={<MovieResult />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;