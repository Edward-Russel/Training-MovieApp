import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
