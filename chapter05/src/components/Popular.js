import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
  );
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
    );
  }
}

export default Popular;