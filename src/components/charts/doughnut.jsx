import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ datasets, labels }) {
  const mappedData = {
    labels,
    datasets,
  };
  return (
    <Doughnut
      options={{
        responsive: true,
        maintainAspectRatio: false, // Set to false to make the chart responsive
        plugins: {
          legend: {
            display: false, // This will hide the legend/labels
          },
        },
      }}
      redraw={false}
      data={mappedData}
    />
  );
}
