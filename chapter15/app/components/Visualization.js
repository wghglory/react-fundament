import React from 'react';
import Data from '../data/data.json';
import Chart from './Chart';
import { array2chart } from '../utils/array2chart';
import rawData from '../data/data.csv';

import '../bootstrap/alert.scss';

const chartData = {
  type: "bar", //radar, bar, horizontalBar, line
  data: array2chart(rawData),
  options: {
    responsive: false,
    title: {
      display: true,
      text: "People that are in Charts!"
    },
    hover: {
      mode: 'label'
    },
    tooltips: {
      mode: 'label' //single
    }
  }
};

export default function Visualization() {
  let smartMessage = Data.smart ? "He is smart." : "He is not smart.";

  return (
    <div>
      <p className="alert alert-info">This part data comes from json file. Webpack json-loader solves.</p>
      <p>{Data.name} is at least {Data.age} years old. {smartMessage}</p>

      <p className="alert alert-success">This part data comes from csv file. Webpack dsv-loader, chart.js, just.randomcolor, canvas.</p>
      <Chart width="800" height="350" {...chartData} style={{ margin: '0 auto' }} />
    </div>
  );
}