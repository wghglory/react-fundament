import React from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api';
import Loading from './Loading';

// Below is a private component: for now only Popular uses this rendered view, so I don't create a file for it
 function SelectedLanguage(props) {
  const languages = ['All', 'Javascript', 'Csharp', 'Java', 'Ruby', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang =>
        (
          <li
            onClick={props.onSelect.bind(null, { lang, url: `https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories` })}  // Other solutions
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

/* //  Solution 1: normal

function SelectedLanguage(props) {
  const languages = ['All', 'Javascript', 'Csharp', 'Java', 'Ruby', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang =>
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
  );
}

SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

SelectedLanguage.defaultProps = {
  selectedLanguage: 'All'
};

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
    this._isMount = true;
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  updateLanguage(lang) {
    this.setState({selectedLanguage: lang, repos: null});

    fetchPopularRepos(lang).then(function (repos) {

      if (this._isMount) {
        this.setState(function () {
          return {repos: repos};
        });
      }

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

export default Popular; */


/* // Solution 2: HOC

import DataComponent from './DataComponent';

const Popular2 = props =>
  (
    <div>
      <SelectedLanguage
        selectedLanguage={props.param.lang}
        onSelect={props.fetchByParam} />
      <RepoGrid repos={props.data} />
    </div>
  );

Popular2.propTypes = {
  data: PropTypes.array.isRequired,
  fetchByParam: PropTypes.func,
  param: PropTypes.object
};

Popular2.defaultProps = {
  param: { lang: 'All' }
};

const Popular = DataComponent(
  Popular2,
  window.encodeURI("https://api.github.com/search/repositories?q=stars:>1+language:All&sort=stars&order=desc&type=Repositories")
);

export default Popular; */


// Solution 3: refs

/* import DataComponent from './DataComponent';

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
    this.pv.fetchByParam(param);
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

export default Popular; */


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

export default Popular;