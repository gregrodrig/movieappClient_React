import styles from "./SendButton.module.css";
export function SendButton({ type, content }) {
  return (
    <button type={type} className={styles.btnSend}>
      {content}
    </button>
  );
}
