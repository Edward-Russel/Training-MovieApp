import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/core/Rating";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import { Theme } from "@emotion/react";

const style: Theme = {
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

const MovieCard = (props: any) => {
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
        <CardMedia sx={{ width: 72, height: 108 }} image={img} title={title} />
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
            <Rating value={rating * 5} precision={0.1} readOnly />
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
