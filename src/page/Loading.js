import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Loading.css";
import treeImage from "../image/tree.png";

function Loading() {
  const navigate = useNavigate();
  const { type } = useParams(); // URL에서 type 파라미터 가져오기
  
  useEffect(() => {
    console.log("Loading 페이지 마운트됨, type:", type);
    const timer = setTimeout(() => {
      if (type === "music") {
        navigate('/MusicResult');
      } else if (type === "movie") {
        navigate('/MovieResult');
      } else {
        navigate('/MusicResult'); // 기본값
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate, type]);

  return (
    <main className="loading-main">
      <div className="loading-container">
        <img src={treeImage} alt="Loading Tree" className="loading-tree" />
        <h2 className="loading-text">당신에게 어울리는 콘텐츠를 찾는 중이에요..</h2>
      </div>
    </main>
  );
}

export default Loading;