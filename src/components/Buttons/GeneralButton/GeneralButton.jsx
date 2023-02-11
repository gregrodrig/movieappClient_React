// import { Link as buttom } from "react-router-dom";
import styles from "./GeneralButton.module.css";
export function GeneralButton({ type, content, ...rest }) {
  return (
    <button type={type} className={styles.btnSend} {...rest}>
      {content}
    </button>
  );
}
