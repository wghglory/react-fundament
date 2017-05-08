# Stateless Functional Components

If you're using React correctly, you're going to notice you have a lot of components that simply take in some data via props and output some UI - that is, components with just a render method. The reason for this is because a really great paradigm to get used to is separating your components into **container components** and **presentational components**, with presentational components optionally taking in some data and rendering a view. Because this is such a common pattern in React, as of React 0.14 you can now have components that are just normal functions if those components only have a render method and optional props.

```jsx
class HelloWorld extends React.Component {
  render () {
    return (
      <div>Hello {this.props.name}</div>
    )
  }
}
ReactDOM.render(<HelloWorld name='Tyler' />, document.getElementById('app'))
```

You'll notice that this component just has a render method, that means we can remove the createClass abstraction and just use a plain function. Refactored to use a **stateless functional component**, the example above would look like this

```jsx
function HelloWorld (props) {
  return (
    <div>Hello {props.name}</div>
  )
}
ReactDOM.render(<HelloWorld name='Tyler' />, document.getElementById('app'))
```

Notice React **passes props to your function as the first argument** to the function so there is **no "this" keyword**. This is a lot **cleaner and makes creating React components more natural** since you're literally just making a function. **It's a good idea to try to use as many Stateless Functional Components as possible because then you have a good separation of presentational components vs other components.**

# Separate presentational components and container components

* write presentational components as stateless function components
* write container components as class with state, pass state as prop into presentational components

> Note: SelectedLanguage, as a stateless function component is also a private component!

```jsx
const React = require('react');
const PropTypes = require('prop-types');

// Below is a private component: for now only Popular uses this rendered view, so I don't create a file for it
/*class SelectedLanguage extends React.Component{
  render(){
    const languages = ['All', 'Javascript', 'Java', 'Ruby', 'CSS', 'Python'];
    
    // note: "this" inside es6 arrow function is same with outer scope, so no need to pass this context to map
    return (
      <ul className="languages">
        {languages.map(lang=>
          (
            <li
              onClick={this.props.onSelect.bind(null, lang)}
              style={lang === this.props.selectedLanguage ? { color: '#d0021b' } : null}
              key={lang}>
              {lang}
            </li>
          )
        )}
      </ul>
    )
  }
}*/

function SelectedLanguage(props){
  const languages = ['All', 'Javascript', 'Java', 'Ruby', 'CSS', 'Python'];
  
  return (
    <ul className="languages">
        {languages.map(lang=>
          (
            <li
              onClick={props.onSelect.bind(null, lang)}
              style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
              key={lang}>
              {lang}
            </li>
          )
        )}
      </ul>
  )
}

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };

    this.updateLanguage = this.updateLanguage.bind(this); // now inside function, "this".setState always points to popular instance which inherits from React.Component
  }

  updateLanguage(lang) {
    this.setState({ selectedLanguage: lang });
    // this.setState(function () {
    //   return {selectedLanguage: lang} 
    // });
  }
  render() {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
      </div>
    )
  }
}

module.exports = Popular;
```