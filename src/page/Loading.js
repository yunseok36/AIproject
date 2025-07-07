import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Loading.css";
import treeImage from "../image/tree.png";

function Loading() {
  const navigate = useNavigate();
  const { type, mood } = useParams(); // type (music/movie)과 mood 파라미터 가져오기
  
  useEffect(() => {
    console.log(`Loading 페이지 마운트됨, Type: ${type}, Mood: ${mood}`);
    const timer = setTimeout(() => {
      if (type === "music") {
        console.log(`MusicResult/${mood} 페이지로 이동`);
        navigate(`/MusicResult/${mood}`);
      } else if (type === "movie") {
        console.log(`MovieResult/${mood} 페이지로 이동`);
        navigate(`/MovieResult/${mood}`);
      } else {
        // 예상치 못한 type일 경우 기본 MusicResult 페이지로 이동
        console.log("예상치 못한 type, 기본 MusicResult/긍정적 페이지로 이동");
        navigate('/MusicResult/긍정적'); 
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate, type, mood]);

  return (
    <main className="loading-main">
      <div className="loading-container">
        <img src={treeImage} alt="Loading Tree" className="loading-tree" />
        <h2 className="loading-text">당신에게 어울리는 콘텐츠를 찾는 중이에요...</h2>
      </div>
    </main>
  );
}

export default Loading;