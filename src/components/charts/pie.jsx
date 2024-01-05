import { PieChart } from "@mui/x-charts/PieChart";

export default function Pie({
  height,
  width,
  legend = true,
  colors,
  tasks = [],
}) {
  const pie_data = {
    data: [
      { id: 0, value: 0, label: "Completed" },
      { id: 1, value: 0, label: "Active" },
      { id: 2, value: 0, label: "Not Started" },
    ],
  };

  tasks.forEach((task) => {
    switch (task.status) {
      case "Completed":
        pie_data.data[0].value += 1;
        break;
      case "Active":
        pie_data.data[1].value += 1;
        break;
      case "Not Started":
        pie_data.data[2].value += 1;
        break;
      default:
        // Handle unexpected status, if necessary
        break;
    }
  });

  const series = [
    {
      data: [...pie_data.data],
      innerRadius: 30,
      outerRadius: 100,
      startAngle: -180,
      endAngle: 180,
      cx: 100,
    },
  ]

  return (
    <PieChart
      colors={colors}
      series={series}
      height={height}
      width={width}
      tooltip={{ trigger: "item" }}
      slotProps={{ legend: { hidden: legend } }}
    />
  );
}
