import { ErrorMessage, Field } from "formik";
import { TextError } from "../TextError/TextError";
import styles from "../Input/Input.module.css";

export function Select({ label, name, options, ...rest }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className={styles.field}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          );
        })}
        <ErrorMessage name={name} component={TextError} />
      </Field>
    </div>
  );
}
