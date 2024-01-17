import styles from "../../css/KanBanCard.module.css";

export default function KanBanCard({ children }) {
  return (
    <div className={styles.KanBanCard}>
      {
        children
      }
    </div>
  )
}