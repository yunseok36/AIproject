import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loading from "./pages/Loading";
import Recommendation from "./pages/Recommendation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/result" element={<Recommendation />} />
      </Routes>
    </BrowserRouter>
  );
}
