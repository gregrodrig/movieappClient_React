import { Field, ErrorMessage } from "formik";
import { TextError } from "../TextError/TextError";
import styles from "./Input.module.css";

export function Input({ label, name, ...rest }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} className={styles.field} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
