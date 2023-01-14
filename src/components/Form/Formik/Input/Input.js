import { TextError } from "../TextError/TextError";
import styles from "./Input.module.css";

export function Input({ label, name, error, ...rest }) {
  return (
    <div className={`form-control ${styles.form}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...rest} className={styles.field} />
      <TextError error={error} />
    </div>
  );
}
