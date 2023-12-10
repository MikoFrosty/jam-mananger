import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const mockJam = {
  created_timestamp: "1702178798644",
  jam_url: "facebook.com",
  options: "",
  time_limit: "1",
  title: "MOCK JAM",
  image_url: "",
};

export default function JamList({ jamList }) {
  // ?sfdsfsd

  if (!jamList || jamList.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={4}>
      {jamList.map((jam) => (
        <Grid item key={jam.id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: "56.25%",
              }}
              image="https://source.unsplash.com/random?wallpapers"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Name: {jam.title}
              </Typography>
              <Typography>
                Time to complete: {jam.time_limit} minutes
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">View</Button>
              <Button size="small">Edit</Button>
            </CardActions> */}
          </Card>
        </Grid>
      ))}
      {/*cards.map((card) => (
        <Grid item key={card} xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: "56.25%",
              }}
              image="https://source.unsplash.com/random?wallpapers"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Heading
              </Typography>
              <Typography>
                This is a media card. You can use this section to describe the
                content.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View</Button>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>
            ))*/}
    </Grid>
  );
}
