import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };
  }
  componentDidMount() {
    const stopper = this.props.text + '...';

    this.interval = setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({text: this.props.text});
      } else {
        this.setState(prevState => ({
          text: prevState.text + '.'
        }));
      }
    }, this.props.speed);

    /* this.interval = setInterval(function () {
      if (this.state.text === stopper) {
        this.setState({
          text: this.props.text // prop, initial value. not state
        });
      } else {
        this.setState(function (prevState) {
          return {
            text: prevState.text + '.'
          };
        });
      }
    }.bind(this), this.props.speed); */
  }
  componentWillUnmount() {
    // avoid memory leak
    clearInterval(this.interval);
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

export default Loading;