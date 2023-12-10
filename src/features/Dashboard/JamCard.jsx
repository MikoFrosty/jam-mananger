import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import JamModal from "../../components/JamModal";

const getJamTimeString = (jam) => {
  const hours = Math.floor(jam.time_limit / 60);
  const minutes = jam.time_limit % 60;
  const hoursString = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "";
  const minutesString =
    minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : "";

  if (hours === 0) {
    return minutesString;
  } else if (minutes === 0) {
    return hoursString;
  } else {
    return hoursString + ", " + minutesString;
  }
};

const getJamCreatedDate = (jam) => {
  const date = new Date(parseInt(jam.created_timestamp));
  return "Created: " + date.toLocaleString();
};

export default function JamCard({ jam, onDelete }) {
  const [open, setOpen] = useState(false);
  //console.log(open);

  if (!jam) {
    return null;
  }
  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            boxShadow: "0px 0px 5px 2px #888888",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
          },
        }}
        onClick={() => {
          setOpen(true);
          // new window
          // window.location.href = 'https://' + jam.jam_url || "#No URL Provided"; // Don't do this here, open card first for editing
        }}
      >
        <CardActionArea>
          <CardMedia
            component="div"
            sx={{
              pt: "56.25%",
            }}
            image={
              jam?.image_url || "https://source.unsplash.com/random?wallpapers"
            }
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {jam.title}
            </Typography>
            <Typography variant="subtitle2">
              Time Span: {getJamTimeString(jam)}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {getJamCreatedDate(jam)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {open && <JamModal isCreate={false} jamData={jam} open={open} setOpen={setOpen} onDelete={onDelete} />}
    </>
  );
}

/*<Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle id="modal-modal-title">{jam.title}</DialogTitle>
          <DialogContent id="modal-modal-description">
            <Typography>
              {"URL: "}
              <a href={jam.jam_url}>{jam.jam_url}</a>
            </Typography>
            <Typography>
              {"Time to Complete: " + getJamTimeString(jam)}
            </Typography>
            <Typography>{jam.image_url}</Typography>
            <Typography>{"Created On: " + getJamCreatedDate(jam)}</Typography>
          </DialogContent>
        </Dialog>*/
