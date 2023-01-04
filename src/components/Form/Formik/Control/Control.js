import { CheckBox } from "../CheckBox/CheckBox";
import { DatePicker } from "../DatePicker/DatePicker";
import { Input } from "../Input/Input";
import { RadioButton } from "../RadioButton/RadioButton";
import { Select } from "../Select/Select";
import { Textarea } from "../Textarea/Textarea";

export function Control({ control, ...rest }) {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButton {...rest} />;
    case "checkbox":
      return <CheckBox {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
}
