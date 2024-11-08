import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TaskChart: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "pie",
      width: 300,
      height: 300,
      backgroundColor: "#EEEEEE",
    },
    title: {
      text: "",
    },
    series: [
      {
        name: "Count",
        colorByPoint: true,
        type: "pie",
        data: Object.keys(statusCounts).map((status) => ({
          name: status,
          y: statusCounts[status],
        })),
      } as Highcharts.SeriesPieOptions,
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default TaskChart;
