import styles from "./Recommendation.module.css";
import MusicCard from "../components/MusicCard.jsx";

export default function Recommendation() {
  const sampleData = [
    {
      image: "/assets/note.png",
      artist: "가수1",
      title: "노래 제목1",
    },
    {
      image: "/assets/note.png",
      artist: "가수2",
      title: "노래 제목2",
    },
    {
      image: "/assets/note.png",
      artist: "가수3",
      title: "노래 제목3",
    },
  ];

  return (
    <div className={styles.container}>
      <h2>이런 음악들을 추천드려요.</h2>
      <div className={styles.grid}>
        {sampleData.map((music, index) => (
          <MusicCard
            key={index}
            image={music.image}
            artist={music.artist}
            title={music.title}
          />
        ))}
      </div>
    </div>
  );
}
