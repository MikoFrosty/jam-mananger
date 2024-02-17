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
      { id: 0, value: 0, label: "Backlog" },
      { id: 1, value: 0, label: "To Do" },
      { id: 2, value: 0, label: "In Progress" },
      { id: 3, value: 0, label: "Done" },
    ],
  };

  console.log("tasks", tasks)

  tasks.forEach((task) => {
    switch (task.status.status_title) {
      case "Backlog":
        pie_data.data[0].value += 1;
        break;
      case "To Do":
        pie_data.data[1].value += 1;
        break;
      case "In Progress":
        pie_data.data[2].value += 1;
        break;
      case "Done": 
        pie_data.data[3].value += 1;
        break;
      default:
        // Handle unexpected status, if necessary
        break;
    }
  });

  console.log("pie data", pie_data.data)

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
