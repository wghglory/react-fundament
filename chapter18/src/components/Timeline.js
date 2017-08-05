/**
 * d3
 */
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