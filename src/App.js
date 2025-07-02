import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Contact from "./page/Contact";
import Loading from "./page/Loading";
import MusicResult from "./page/MusicResult"; // 음악 결과 페이지 import
import MovieResult from "./page/MovieResult"; // 영화 결과 페이지 import

function App() {
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
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Loading/:type" element={<Loading />} /> {/* URL 파라미터 사용 */}
          <Route path="/MusicResult" element={<MusicResult />} /> {/* 음악 결과 페이지 라우트 */}
          <Route path="/MovieResult" element={<MovieResult />} /> {/* 영화 결과 페이지 라우트 */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;