import React from "react";
import "./Corona.css";
import { Line } from "react-chartjs-2";
const Corona = (props) => {
  const data = {
    labels: props.xAxis.map((l) => l.substr(0, 10)),
    datasets: [
      {
        label: "COVID-19 ",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.yAxis,
      },
    ],
  };

  return (
    <div className=" mt-3">
      <div className="container mt-5">
        <div className="corona">
          <Line data={data} />
        </div>
      </div>
    </div>
  );
};

export default Corona;
