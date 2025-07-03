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
          {/* type과 mood 파라미터 추가 */}
          <Route path="/Loading/:type/:mood" element={<Loading />} /> 
          {/* mood 파라미터 추가 */}
          <Route path="/MusicResult/:mood" element={<MusicResult />} /> 
          {/* mood 파라미터 추가 */}
          <Route path="/MovieResult/:mood" element={<MovieResult />} /> 
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;