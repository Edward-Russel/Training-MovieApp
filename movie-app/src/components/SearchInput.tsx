import { forwardRef } from "react";
import { SxProps, Theme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

type SearchInputProps = {
  sx: SxProps<Theme> | undefined;
  [propName: string]: any;
};

const SearchInput = forwardRef((props: SearchInputProps, ref) => {
  return (
    <Paper
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", ...props.sx }}
    >
      <InputBase
        {...props}
        ref={ref}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Найти фильм по названию"
      />
      <IconButton type="submit" sx={{ p: "10px" }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
});

export default SearchInput;
