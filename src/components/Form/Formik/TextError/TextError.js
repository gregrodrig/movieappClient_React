import styles from "./TextError.module.css";

export function TextError(props) {
  return <div className={styles.error}>{props.children}</div>;
}
