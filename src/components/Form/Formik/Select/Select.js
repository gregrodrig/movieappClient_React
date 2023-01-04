import { ErrorMessage, Field } from "formik";
import { TextError } from "../TextError/TextError";
import styles from "../Input/Input.module.css";

export function Select({ label, name, options, onValue, ...rest }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field
        as="select"
        id={name}
        name={name}
        value={name}
        {...rest}
        className={styles.field}
        onChange={(e) => {
          onValue(e.target.value);
        }}
      >
        {options.map((option) => {
          return (
            <option key={option.idPais} value={option.idPais}>
              {option.pais}
            </option>
          );
        })}
        <ErrorMessage name={name} component={TextError} />
      </Field>
    </div>
  );
}
