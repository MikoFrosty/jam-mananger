import Grid from "@mui/material/Grid";
import JamCard from "./JamCard";

export default function JamList({ jamList }) {
  if (!jamList || jamList.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={4}>
      {jamList.map((jam, i) => (
        <Grid item key={jam?.id || i} xs={12} sm={6} md={4}>
          <JamCard jam={jam} />
        </Grid>
      ))}
    </Grid>
  );
}
