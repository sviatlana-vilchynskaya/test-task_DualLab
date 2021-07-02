import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {getUsdData, getEurData, getRurData} from '../data/apiData';


const Rates = () => {
  const [dateData, setDateData] = useState([]);
  const [eurData, setEurData] = useState([]);
  const [rurData, setRurData] = useState([]);
  const [usdData, setUsdData] = useState([]);

  const data = (canvas) => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 90, 100, 0);
      const gradient1 = ctx.createLinearGradient(0, 90, 100, 0);
      const gradient2 = ctx.createLinearGradient(0, 90, 100, 0);
      gradient.addColorStop(0, '#ff9a9e');
      gradient.addColorStop(0.5, '#fad0c4');
      gradient.addColorStop(1, '#fad0c4');

      gradient1.addColorStop(0, '#B7F8DB');
      gradient1.addColorStop(0.5, '#50A7C2');
      gradient1.addColorStop(1, '#B7F8DB');

      gradient2.addColorStop(0, '#B7F0DB');
      gradient2.addColorStop(0.5, '#50B7C2');
      gradient2.addColorStop(1, '#B7F0DB');

      return {
          labels: dateData,
          datasets: [
              {
                  fill: false,
                  label: 'USD',
                  data: usdData,
                  backgroundColor: gradient1,
                  borderColor: gradient1,
                  borderWidth: 4
              },
              {
                  fill: false,
                  label: 'EUR',
                  data: eurData,
                  backgroundColor: gradient,
                  borderColor: gradient,
                  borderWidth: 4
              },
              {
                fill: false,
                label: 'RUR',
                data: rurData,
                backgroundColor: gradient2,
                borderColor: gradient2,
                borderWidth: 4
            }
          ]
      }
  }
  const options = {
      responsive: true,
      tooltips: {
          mode: 'index',
          intersect: false,
      },
      hover: {
          mode: 'nearest',
          intersect: true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      legend: {
          display: true,
          position: 'bottom',
          labels: {
              fontColor: 'rgba(242, 38, 19, 1)'
          }
      },
  }
  const getChartDataUSD = async () => {
      try{
          let dateArray = [];
          let usdArray = [];
          const response = await getUsdData();
          response.forEach(element => {
              usdArray.push(element.Cur_OfficialRate);
              dateArray.push(element.Date.slice(0,-9));
          });
          setDateData(dateArray);
          setUsdData(usdArray);
      }catch(error) {
          console.log(error);
      }
  }

  const getChartDataEUR = async () => {
    try{
        let dateArray = [];
        let eurArray = [];
        const response = await getEurData();
        response.forEach(element => {
            eurArray.push(element.Cur_OfficialRate);
            dateArray.push(element.Date.slice(0,-9));
        });
        setDateData(dateArray);
        setEurData(eurArray);
    }catch(error) {
        console.log(error);
    }
}
const getChartDataRUR = async () => {
  try{
      let dateArray = [];
      let rurArray = [];
      const response = await getRurData();
      response.forEach(element => {
          rurArray.push(element.Cur_OfficialRate);
          dateArray.push(element.Date.slice(0,-9));
      });
      setDateData(dateArray);
      setRurData(rurArray);
  }catch(error) {
      console.log(error);
  }
}

  useEffect(() => {
      getChartDataUSD();
      getChartDataEUR();
      getChartDataRUR();
  }, []);
  return (
    <Line 
      data={data} 
      options={options}
    />
  );
}


export default Rates;
