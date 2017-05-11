In this chapter, we want to create a new router called Visualization. Then load data.json and show chart.

# webpack json-loader and dsv-loader

`npm install json-loader dsv-loader --save-dev`, then include below in webpack.config.js

```javascript
{
  test: /\.json$/,
  loader: 'json-loader'
},
{
  test:/\.csv$/,
  loader:'dsv-loader'
}
```

# Install chart.js and just.randomcolor

Visualization.js

```jsx
import React from 'react';
import Data from '../data/data.json';
import Chart from './Chart';
import { array2chart } from '../utils/array2chart';
import rawData from '../data/data.csv';

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
```

Chart.js

```jsx
import React from 'react';
import ChartJS from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.defaults.global.defaultFontSize = 16;

export default class Chart extends React.Component {

  componentDidMount() {
    this.createChart();
  }
  componentWillUnmount() {
    this.killChart();
  }

  componentDidUpdate(prevProps, prevState) {
    this.killChart();
    this.createChart();
  }

  createChart() {
    const ctx = this.canvas.getContext('2d');
    let { type, data, options } = this.props;

    this.chart = new ChartJS(ctx, {
      type: type,
      data: data,
      options: options
    });
  }

  killChart() {
    this.chart && this.chart.destroy();
  }

  render() {
    let canvasProps = { width: this.props.width, height: this.props.height, style: this.props.style };
    return (
      <canvas {...canvasProps} ref={(c) => { this.canvas = c; }}></canvas>
    );
  }
}

Chart.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

Chart.defaultProps = {
  width: '800',
  height: '250'
};
```