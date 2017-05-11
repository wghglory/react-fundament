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