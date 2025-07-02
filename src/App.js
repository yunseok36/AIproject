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
import MyPage from "./page/MyPage";
import Join from "./component/Join";
import Calendar from "./page/Calendar";
import Detail from "./page/Detail";
import Contact from "./page/Contact";

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
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/MyMood" element={<MyPage />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
