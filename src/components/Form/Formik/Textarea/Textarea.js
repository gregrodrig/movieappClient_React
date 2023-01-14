import styles from "../Input/Input.module.css";
import { TextError } from "../TextError/TextError";

export function Textarea({ label, name, error, ...rest }) {
  return (
    <div className={`form-control ${styles.form}`}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        className={styles.field}
        {...rest}
      ></textarea>
      <TextError error={error} />
    </div>
  );
}
