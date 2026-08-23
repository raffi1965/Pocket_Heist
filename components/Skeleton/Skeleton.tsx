import styles from "./Skeleton.module.css"

export default function Skeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={styles.avatar}></div>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.fullLine}></div>
        <div className={styles.fullLine}></div>
        <div className={styles.mediumLine}></div>
      </div>
    </div>
  )
}
