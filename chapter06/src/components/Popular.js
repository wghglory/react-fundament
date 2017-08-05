import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fetchPopularRepos} from '../utils/api';

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

    fetchPopularRepos(lang)
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
          ? <p>LOADING!</p>
          : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}

export default Popular;