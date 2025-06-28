import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Main from "./page/Main";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;