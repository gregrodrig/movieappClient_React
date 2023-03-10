import styles from "../Input/Input.module.css";
import { TextError } from "../TextError/TextError";

export function Select({ label, name, options, error, onValue, ...rest }) {
  return (
    <div className={`form-control ${styles.form}`}>
      <label htmlFor={name}>{label}</label>
      <select
        as="select"
        id={name}
        name={name}
        value={name}
        {...rest}
        className={styles.field}
        // onChange={(e) => {
        //   onValue(e.target.value);
        // }}
      >
        <option value="0">Seleccione</option>

        {options.map((option) => {
          return (
            <option key={option.idPais} value={option.idPais}>
              {option.pais}
            </option>
          );
        })}
        <TextError error={error} />
      </select>
    </div>
  );
}
