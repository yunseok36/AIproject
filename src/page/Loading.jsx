import styles from "./Loading.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
      <p className={styles.text}>감정을 분석 중입니다...</p>
    </div>
  );
}
