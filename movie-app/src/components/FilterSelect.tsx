import { forwardRef, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Stack from "@material-ui/core/Stack";

const FilterSelect = forwardRef((props: any & { set: any[] }) => {
  const { title } = props;
  const values = props.set;
  const rootValue = props.root;
  const defaultValue = props.default || rootValue || values[0];
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <Stack>
      <InputLabel shrink htmlFor="select-multiple-native">
        {title}
      </InputLabel>
      <Select value={value} {...props} onChange={handleChange}>
        {rootValue !== undefined && (
          <MenuItem value={rootValue}>{rootValue}</MenuItem>
        )}
        {values.map((value: any) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
});

export default FilterSelect;
