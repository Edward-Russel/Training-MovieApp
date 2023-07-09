import { forwardRef } from "react";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";

const SearchInput = forwardRef((props: any, ref: any) => {
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
