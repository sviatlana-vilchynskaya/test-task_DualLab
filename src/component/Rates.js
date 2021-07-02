import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const Rates = () => {
  const [chartData, setChartData] = useState({});
  const [curOffRate, setCurOffRate] = useState([]);
  const [curRateDate, setCurRateDate] = useState([]);

  const chart = () => {
    let curOff = [];
    let curDate = [];
    axios
      .get("https://www.nbrb.by/API/ExRates/Rates/Dynamics/298?startDate=2021-6-1&endDate=2021-6-30")
      .then(res => {
        for (const dataObj of res.data) {

          curOff.push(dataObj.Cur_OfficialRate);
          curDate.push(dataObj.Date.slice(0,-9));
        }
        setChartData({
          labels: curDate,
          datasets: [
            {
              label: "RUR",
              data: curOff,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(curOff);
    console.log(curDate);

  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Курсы валют</h1>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div>
  );
};

export default Rates;
