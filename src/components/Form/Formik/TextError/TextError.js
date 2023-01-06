import styles from "./TextError.module.css";

export function TextError({ error }) {
  return <div className={styles.error}>{error}</div>;
}
