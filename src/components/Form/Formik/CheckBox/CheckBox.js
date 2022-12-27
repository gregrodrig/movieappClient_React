import { Field, ErrorMessage } from "formik";
import React from "react";
import { TextError } from "../TextError/TextError";
import styles from "../Input/Input.module.css";

export function CheckBox({ label, name, options, ...rest }) {
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name} {...rest} className={styles.field}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
