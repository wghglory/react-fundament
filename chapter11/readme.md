# Create a reusable Loading component

## Defaulting props with defaultProps

A large benefit of React is creating and consuming highly reusable components. If you think about strategies for **creating reusable components, a very important aspect is through props**. For example, if we were creating a reusable <Loading /> component, we would want the user to be able to specify certain properties that are specific to their application. For example, you'd want the user to be able to specify their own styles or specify what the actual loading text will be. But what if some users don't want to specify their own specific style or loading text but instead want to use some default text? This is where **defaultProps** comes into play. defaultProps allows you to sspecify what the default props will be in a component if those specific props aren't specified when the component is invoked.

## Resuable Component, Solution 1

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

Now import `Loading` into Popular and Result component, replace `<p>Loading</p>` to `<Loading/>`

Take Popular.js as an example:

Popular component checks it repos state, before api returns any data, repos is null, so loading will be showing. Once we get back some data, the view will be updated.

```jsx
{!this.state.repos
    ? <Loading />
    : <RepoGrid repos={this.state.repos} />
}
```

```jsx
const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');

const Loading = require('./Loading');

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

function SelectedLanguage(props) {
  const languages = ['All', 'Javascript', 'Java', 'Ruby', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang =>
        (
          <li
            onClick={props.onSelect.bind(null, lang)}  // use Popular
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            key={lang}>
            {lang}
          </li>
        )
      )}
    </ul>
  );
}

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

SelectedLanguage.defaultProps = {
  selectedLanguage: 'All'
};

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

// Solution 1:
class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this); // now inside function, "this".setState always points to popular instance which inherits from React.Component
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({ selectedLanguage: lang, repos: null });

    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          };
        });
      }.bind(this));

  }
  render() {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}

module.exports = Popular;
```

Above is a good solution. It checks if api returns any data and decide which component to render based on `this.props.repos`.

Another good solution is `Higher Order Components`.

## Higher Order Component -- best to reuse

A higher-order component, or HOC, is a simply a function that **takes a React component as an argument and returns another React component**. Typically, HOCs wrap the incoming component with a class that maintains state or has functionality. Higher-order components are the best way to reuse functionality across React components.

An HOC allows us to wrap a component with another component. The parent component can hold state or contain functionality that can be passed down to the composed component as properties. The composed component does not need to know anything about the implementation of an HOC other than the names of the properties and methods that it makes available.

If we harness this loading functionality, we can reuse it across components. We could create a higher-order component, the DataComponent, that can be used to create React components that load data. To use the DataComponent, we strip the Popular's state and create a stateless functional component that receives data via props.

The HOC provides the state for loading and the mechanism to load data and change its own state. While data is loading, the HOC displays a loading message. Once the data has loaded, the HOC handles mounting the Popular and passing it people as the data property:

DataComponent.js:

```jsx
import React from 'react';

const DataComponent = (ComposedComponent, url) => (
  class DataComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        loading: false
      };

      this._getData = this._getData.bind(this);
      this.childCanUpdateMe = this.childCanUpdateMe.bind(this);
    }

    _getData(param = {}) {
      if (param.url) {
        url = param.url;
      }

      this.setState({ loading: true });
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
          loading: false,
          data: data.items,
          param
        }));
    }

    childCanUpdateMe(param) {
      this._getData(param);
    }

    componentWillMount() {
      this._getData();
    }

    componentWillReceiveProps(nextProps) {
      // console.log(nextProps.param);
      // if param doesn't pass, maybe some other props, we don't want to call it
      if (nextProps.param) {
        this._getData(nextProps.param);
      }
    }

    render() {
      return (
        <div className="data-component">
          {(this.state.loading) ?
            <p style={{ textAlign: 'center', fontSize: '20px' }}>Loading...</p> :
            <ComposedComponent {...this.state} {...this.props} childCanUpdateMe={this.childCanUpdateMe} />
          }
        </div>
      );
    }
  }

);

export default DataComponent;
```

Notice that DataComponent is actually a function. All higher-order components are functions. ComposedComponent is the component that we will wrap. The returned class, DataComponent, stores and manages the state. When that state changes and the data has loaded, the ComposedComponent is rendered and that data is passed to it as a property.

**The most important thing is that when we pass `childCanUpdateMe` function to child component, and when we call this function, we pass `param` object to parent DataComponent, `childCanUpdateMe` will setState and make new ajax request using `param` object.** `<li>` onClick calls `childCanUpdateMe`, and passes `{lang, url}` as `param`, so the new ajax request url is updated.

SelectedLanguage component:

```jsx
<li onClick={props.onSelect.bind(null, { lang, url: `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories` })} /> 
```

## Solution 2

Popular.js:

```jsx
...
import DataComponent from './DataComponent';

const Popular2 = props =>
  (
    <div>
      <SelectedLanguage
        selectedLanguage={props.param.lang}
        onSelect={props.childCanUpdateMe} />  // initial uses defaultProps 'All', onClick sets up param
      <RepoGrid repos={props.data} />
    </div>
  );

Popular2.propTypes = {
  data: PropTypes.array.isRequired,
  childCanUpdateMe: PropTypes.func,
  param: PropTypes.object
};

Popular2.defaultProps = {
  param: { lang: 'All' }
};

const Popular = DataComponent(
  Popular2,
  window.encodeURI("https://api.github.com/search/repositories?q=stars:>1+language:All&sort=stars&order=desc&type=Repositories")
);

module.exports = Popular;
```

Solution 2 uses DataComponent and passes Popular2. Any composedComponent has `data, childCanUpdateMe, param` from DataComponent. A small issue is that the language list will disappear(loading with repos), because it's wired up inside DataComponent.

##  Solution 3: refs

Popular.js

```jsx
...
// Solution 3: refs

import DataComponent from './DataComponent';

const RepoList = props => {
  // console.log(props)
  return (
    <RepoGrid repos={props.data} />
  );
};

RepoList.propTypes = {
  data: PropTypes.array.isRequired
};

const PopularView = DataComponent(
  RepoList,
  window.encodeURI("https://api.github.com/search/repositories?q=stars:>1+language:All&sort=stars&order=desc&type=Repositories")
);

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(param) {
    this.setState({ selectedLanguage: param.lang });
    // trigger PopularView fetch url and lang
    this.pv.childCanUpdateMe(param);
  }

  render() {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
        <PopularView ref={pv => this.pv = pv}/>
      </div>
    );
  }
}

module.exports = Popular;
```

Solution 3 isolates Repo and language list. Popular component is parent of Repo(HOC) and languageList. It's easy to udpate the language, but the difficult part is how we can call `childCanUpdateMe` to make a new request when clicking any language inside `updateLanguage` function. Both Parent Popular component and child DataComponent have states, functions. Popular needs access to DataComponent functions. Usually, React data flow is from parent to child by passing props. So here, we uses `ref` to get child component: `<PopularView ref={pv => this.pv = pv} />`. Then we can call `childCanUpdateMe` inside `updateLanguage`. At last, clicking any language will execute this function, update selected language, make a new ajax request by passing new language and url.

## Solution 4: componentWillReceiveProps

Our goal is to let DataComponent make a new request and setState. What we have done is that we can update selectedLanguage. In solution 3, parent component Popular uses `refs` to get child DataComponent. We shouldn't use this method frequently since it offends one-way data flow from parent to children. Usually children can access parent's state, props by props. Children can know everything about parent, while parent doesn't know children, and React does this by lifting state to parent.

In solution 4, it doesn't call childCanUpdateMe method to make new request and setState since parent doesn't know child's info. PopularView actually is DataComponent. When selectedLanguage updates, PopularView's param props changes, DataComponent's `componentWillReceiveProps(nextProps)` will be called, where we fetch and setState. To sum up, parent selectedLanguage state changes, and parent passes it as a props to child DataComponent. As long as this props changes, DataComponent's `componentWillReceiveProps` knows that, and it will fetch new data and setState.

```jsx
// Solution 4: componentWillReceiveProps
import DataComponent from './DataComponent';

const RepoList = props => <RepoGrid repos={props.data} />;

RepoList.propTypes = {
  data: PropTypes.array.isRequired
};

const PopularView = DataComponent(
  RepoList,
  window.encodeURI("https://api.github.com/search/repositories?q=stars:>1+language:All&sort=stars&order=desc&type=Repositories")
);

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(param) {
    this.setState({ selectedLanguage: param.lang });
    // solution 4 doesn't call below method to make new request and setState
    // When selectedLanguage updates, PopularView's param props changes,
    // DataComponent's componentWillReceiveProps(nextProps) will be called, where we fetch and setState
    // this.pv.childCanUpdateMe(param);
  }

  render() {
    return (
      <div>
        <SelectedLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
        <PopularView param={{ lang: this.state.selectedLanguage, url: `https://api.github.com/search/repositories?q=stars:>1+language:${this.state.selectedLanguage}&sort=stars&order=desc&type=Repositories` }} />
      </div>
    );
  }
}

module.exports = Popular;
```
   