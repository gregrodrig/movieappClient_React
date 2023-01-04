import { Field, ErrorMessage } from "formik";
import { TextError } from "../TextError/TextError";
import styles from "../Input/Input.module.css";

export function Textarea({ label, name, ...rest }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field
        as="textarea"
        id={name}
        name={name}
        {...rest}
        className={styles.field}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
