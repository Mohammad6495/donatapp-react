import React from "react";
import { useField } from "formik";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { FormControl, InputLabel } from "@mui/material";

const FormikMUITextArea = ({
  labelText,
  textAreaProps,
  labelprops,
  formcontrolprops,
  textAreaRows = 4,
  textAreaPlaceHolder,
  textAreaStyle,
  textAreaClasses,
}) => {
  const [field, meta] = useField(textAreaProps);

  return (
    <FormControl {...formcontrolprops}>
      <div {...labelprops} className={`fs-8 mb-1 ${labelprops?.className}`}>
        {labelText}
      </div>
      <TextareaAutosize
        {...field}
        {...textAreaProps}
        maxRows={textAreaRows}
        aria-label="maximum height"
        placeholder={textAreaPlaceHolder}
        style={textAreaStyle}
        className={textAreaClasses}
        onChange={(e) => {
          if (textAreaProps?.set_value) {
            const val = e?.target?.value;
            textAreaProps?.set_value(val);
          }
          field.onChange(e);
        }}
      />
      <div
        style={{ color: "red", fontSize: ".7rem", height: "17px" }}
        className="error mt-2"
      >
        {meta.touched && meta.error ? meta.error : ""}
      </div>
    </FormControl>
  );
};

export default FormikMUITextArea;
