import { forwardRef, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";

type FilterSelectProps = {
  title: string;
  set: Array<string | number>;
  root: string;
  default: string | number;
  [propNane: string]: any;
}

const FilterSelect = forwardRef((props: FilterSelectProps, ref) => {
  const { title } = props;
  const values = props.set;
  const rootValue = props.root;
  const defaultValue = props.default || rootValue || values[0];
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: SelectChangeEvent<string | number>) => {
    setValue(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <Stack>
      <InputLabel shrink htmlFor="select-multiple-native">
        {title}
      </InputLabel>
      <Select ref={ref} value={value} {...props} onChange={handleChange}>
        {rootValue !== undefined && (
          <MenuItem value={rootValue}>{rootValue}</MenuItem>
        )}
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
});

export default FilterSelect;
