import { LineChart } from "@mui/x-charts/LineChart";

export default function Line({ xAxis, series, colors, height, width }) {
  return <LineChart height={height} width={width} xAxis={xAxis} series={series} colors={colors} />;
}
