import styles from "./MusicCard.module.css";

export default function MusicCard({ image, artist, title }) {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
    </div>
  );
}
