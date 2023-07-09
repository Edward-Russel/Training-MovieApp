import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MoovieApp
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Фильмы
        </Button>
        <Button component={Link} to="/profile" color="inherit">
          Профиль
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
