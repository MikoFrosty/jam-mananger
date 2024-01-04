import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export default function SparkLine({ series, plotType, height, colors }) {
  return (
    <SparkLineChart data={ series } plotType={plotType} height={height} colors={colors}/>
  )
}
