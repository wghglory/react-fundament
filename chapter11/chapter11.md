We're going to create a reusable Loading component

# Defaulting props with defaultProps

A large benefit of React is creating and consuming highly reusable components. If you think about strategies for **creating reusable components, a very important aspect is through props**. For example, if we were creating a reusable <Loading /> component, we would want the user to be able to specify certain properties that are specific to their application. For example, you'd want the user to be able to specify their own styles or specify what the actual loading text will be. But what if some users don't want to specify their own specific style or loading text but instead want to use some default text? This is where **defaultProps** comes into play. defaultProps allows you to sspecify what the default props will be in a component if those specific props aren't specified when the component is invoked.

```jsx
class Loading extends React.Component {
  render () {
    ...
  }
}
Loading.defaultProps = {
  text: 'loading',
  styles: {color: 'red'}
}
```

Now if someone uses our Loading component like this

```jsx
<Loading />
```

without specifying a text or styles property, this.props.text will default to 'loading' and this.props.styles will default to {color: 'red'}.

but if our component is used like this

```jsx
<Loading text='One second' styles={color: 'green'} />
```

Then this.props.text will be 'One second' and this.props.color will be 'green'.

---

Create Loading.js

```jsx
const React = require('react');
const PropTypes = require('prop-types');

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
    this.interval = window.setInterval(function () {
      if (this.state.text === stopper) {
        this.setState(function () {
          return {
            text: this.props.text
          }
        })
      } else {
        this.setState(function (prevState) {
          return {
            text: prevState.text + '.'
          }
        });
      }
    }.bind(this), this.props.speed)
  }
  componentWillUnmount() {
    // avoid memory leak
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
};

module.exports = Loading;
```

Now import Loading into Popular and Result component, replace `<p>Loading</p>` to `<Loading/>`