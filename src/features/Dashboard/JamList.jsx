import Grid from "@mui/material/Grid";
import JamCard from "./JamCard";

export default function JamList({ jamList, onDelete }) {
  if (!jamList || jamList.length === 0) {
    return null;
  }

  console.log('jamList', jamList);

  return (
    <Grid container spacing={4}>
      {jamList.map((jam, i) => (
        <Grid item key={jam?.id || i} xs={12} sm={12} md={6} lg={4}>
          <JamCard jam={jam} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
}
