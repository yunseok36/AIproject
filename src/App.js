import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Main from "./page/Main";
import Guide from "./page/Guide";
import MoodCheck from "./page/MoodCheck";
import Music from "./page/Music";
import Movie from "./page/Movie";
import MoodSurvey from "./page/MoodSurvey";
<<<<<<< HEAD
import Login from "./component/Login";
import MyPage from "./page/MyPage";
import Join from "./component/Join";
=======
import MyPage from "./page/MyPage";
import Calendar from "./page/Calendar";
import Contact from "./page/Contact";
>>>>>>> ad2aac12a8fbce79e372f4b47b4b82e1b820edef

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
<<<<<<< HEAD
          <Route path="/Login" element={<Login />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/Join" element={<Join />} />
=======
          <Route path="/MyMood" element={<MyPage />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Contact" element={<Contact />} />
>>>>>>> ad2aac12a8fbce79e372f4b47b4b82e1b820edef
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
