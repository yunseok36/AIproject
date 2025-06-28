import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Main from "./page/Main";
import Guide from "./page/Guide";
import MoodSurvey from "./page/MoodSurvey";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/survey" element={<MoodSurvey />} />
          <Route path="/input" element={<div>직접 입력 페이지</div>} />
          <Route path="/contents" element={<div>추천 콘텐츠 페이지</div>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;