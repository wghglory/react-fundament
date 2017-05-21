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

Visualization.js: we created alert.scss and import it to this component

```jsx
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
```

Chart.js: 

> note `ref` is jquery-like way to get element. Using `ref` is uncontrolled component. Don't use unless necessary.

```jsx
import React from 'react';
import ChartJS from 'chart.js';
import PropTypes from 'prop-types';

ChartJS.defaults.global.defaultFontSize = 16;

export default class Chart extends React.Component {

  componentDidMount() {
    this.createChart();
  }

  // avoid memory leak
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

# D3.js -- [Data-Driven Documents](https://d3js.org)

```jsx
// Timeline.js
import * as d3 from 'd3';
import React from 'react';

const data = [
  {
    year: 1879,
    event: "Ski Manufacturing Begins"
  },
  {
    year: 1882,
    event: "US Ski Club Founded"
  },
  {
    year: 1924,
    event: "First Winter Olympics Held"
  },
  {
    year: 1926,
    event: "First US Ski Shop Opens"
  },
  {
    year: 1932,
    event: "North America's First Rope Tow Spins"
  },
  {
    year: 1936,
    event: "First Chairlift Spins"
  },
  {
    year: 1949,
    event: "Squaw Valley, Mad River Glen Open"
  },
  {
    year: 1958,
    event: "First Gondola Spins"
  },
  {
    year: 1964,
    event: "Plastic Buckle Boots Available"
  }
];

const Canvas = ({ children }) =>
  (
    <svg height="300" width="960">
      {children}
    </svg>
  );

const TimelineDot = ({ position, txt }) =>
  (
    <g transform={`translate(${position},0)`}>

      <circle cy={220}
        r={5}
        style={{ fill: 'blue' }} />

      <text y={160}
        x={-140}
        transform="rotate(-45)"
        style={{ fontSize: '12px' }}>{txt}</text>
    </g>
  );

export default class Timeline extends React.Component {

  constructor(props) {
    const times = d3.extent(data.map(d => d.year));
    const range = [50, 800];
    super(props);
    this.scale = d3.scaleLinear().domain(times).range(range);
    this.state = { data, times, range };
  }

  render() {
    const { data } = this.state;
    const { scale } = this;
    return (
      <div className="timeline">
        <h1>{this.props.name} Timeline</h1>
        <Canvas>
          {data.map((d, i) =>
            <TimelineDot position={scale(d.year)}
              txt={`${d.year} - ${d.event}`}
              key={i}
            />
          )}
        </Canvas>
      </div>
    );
  }

}

/*
export default class Timeline extends React.Component {

  constructor(props) {
    const times = d3.extent(data.map(d => d.year));
    const range = [50, 800];
    super(props);
    this.state = { data, times, range };
  }

  // not good to do heavy things here by d3
  componentDidMount() {
    let group;
    const { data, times, range } = this.state;
    const target = this.d3content;
    const scale = d3.scaleLinear().domain(times).range(range);

    d3.select(target)
      .append('svg')
      .attr('height', 300)
      .attr('width', 960);

    group = d3.select(target.children[0])
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr(
      'transform',
      (d, i) => 'translate(' + scale(d.year) + ', 0)'
      );

    group.append('circle')
      .attr('cy', 220)
      .attr('r', 5)
      .style('fill', 'blue');

    group.append('text')
      .text(d => d.year + " - " + d.event)
      .style('font-size', 12)
      .attr('y', 160)
      .attr('x', -140)
      .attr('transform', 'rotate(-45)');
  }

  render() {
    return (
      <div className="timeline">
        <h4 className="d3header">{this.props.name} Timeline</h4>
        <div ref={d3content => this.d3content = d3content}></div>
      </div>
    );
  }
}*/
```

# Use Javascript fetch API instead of axios

As of May 11, 2017, [fetch is still an experimental technology](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Its api may change in future.

utils/api.js

```diff
const axios = require('axios');

function getProfile(username) {
-   return axios.get('https://api.github.com/users/' + username + params).then(user => user.data);
+   return fetch('https://api.github.com/users/' + username + params).then(res => res.json());
}

function getRepos(username) {
-   return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
+   return fetch('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100').then(res => res.json());
}

// get total stars for all his repos
function getStarCount(repos) {
   // use axios:
-  return repos.data.reduce(function (count, repo) {
-     return count + repo.stargazers_count;
-  }, 0);

  // use fetch
+  return repos.reduce(function (count, repo) {
+    return count + repo.stargazers_count;
+  }, 0);
}

...

function getUserData(player) {
-  // return axios.all([
  //   getProfile(player),
  //   getRepos(player)
  // ]).then(function (data) {
  //   const profile = data[0];
  //   const repos = data[1];

  //   return {
  //     profile: profile,
  //     score: calculateScore(profile, repos)
  //   };
  // });

  // use fetch
+  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    const profile = data[0];
    const repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    };
  });
}

module.exports = {
  battle: function (players) {
-    // return axios.all(players.map(getUserData))
    //   .then(sortPlayers)
    //   .catch(handleError);

    // use fetch
+    return Promise.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  
  fetchPopularRepos: function (language) {
    const encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

-    // return axios.get(encodedURI).then((response) => response.data.items);
+    return fetch(encodedURI).then(res => res.json()).then(p => p.items);
  }
};
```