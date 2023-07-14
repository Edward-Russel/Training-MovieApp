import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { baseUrl } from "../services/tmdb";

type MovieCardProps = {
  rating: number;
  title: string;
  release: string;
  description: string;
  img: string;
}

const style = {
  "& > *": {
    mt: 2,
  },
  maxHeight: "80%",
  overflow: "auto",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const MovieCard = (props: MovieCardProps) => {
  const { rating, title, release, description, img } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <img src={`${baseUrl}${img}`} width="72" height="108" title={title} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h6">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
            >
              {release}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Rating value={rating} precision={0.1} readOnly />
          </Box>
        </Box>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">Подробнее</Typography>
          <Typography>{description}</Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button variant="contained" onClick={handleClose}>
              Закрыть
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MovieCard;
