import { Field, ErrorMessage } from "formik";
import { TextError } from "../TextError/TextError";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../Input/Input.module.css";

export function DatePicker({ label, name, ...rest }) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name} className={styles.field}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              className={styles.field}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
