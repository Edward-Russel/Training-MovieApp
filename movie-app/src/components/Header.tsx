import { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const mainWhite = "white";
const mainBlack = "#1976d2";

const Italicized = styled.span(
  {
    fontFamily: "Libre Baskerville, serif",
  },
  (props) => ({
    color: props.theme === "black" ? mainWhite : mainBlack,
  })
);

const Block = styled.div((props) => ({
  backgroundColor: props.theme === "black" ? mainBlack : mainWhite,
  "& > * > a": {
    color: props.theme === "black" ? mainWhite : mainBlack,
  },
}));

function Header() {
  const [theme, setTheme] = useState("black");

  const themeTrigger = () => setTheme(prevState => prevState === "black" ? "white" : "black");

  return (
    <AppBar position="static">
      <Block theme={theme}>
        <Toolbar>
          <Typography
            variant="h6"
            onClick={themeTrigger}
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            <Italicized theme={theme}>MoovieApp</Italicized>
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Фильмы
          </Button>
          <Button component={Link} to="/profile" color="inherit">
            Профиль
          </Button>
        </Toolbar>
      </Block>
    </AppBar>
  );
}

export default Header;
