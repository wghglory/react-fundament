const React = require('react');

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
    const languages = ['All', 'Javascript', 'Java', 'Ruby', 'CSS', 'Python'];

    return (
      // note: map second para should pass context if using es5 function, so onClick "this".updateLanguage works
      // <ul className="languages">
      //   {languages.map(function(lang){
      //     return (
      //       <li
      //         onClick={this.updateLanguage.bind(null, lang)}
      //         style={lang === this.state.selectedLanguage ? { color: '#d0021b' } : null}
      //         key={lang}>
      //         {lang}
      //       </li>
      //     )
      //   }, this)}
      // </ul>

      // note: "this" inside es6 arrow function is same with outer scope, so no need to pass this context to map
      // <ul className="languages">
      //   {languages.map(lang=>{
      //     return (
      //       <li
      //         onClick={this.updateLanguage.bind(null, lang)}
      //         style={lang === this.state.selectedLanguage ? { color: '#d0021b' } : null}
      //         key={lang}>
      //         {lang}
      //       </li>
      //     )
      //   })}
      // </ul>

      // note: "this" inside es6 arrow function is same with outer scope, so no need to pass this context to map
      // replace { return x } to x if only returning 1 statement
      <ul className="languages">
        {languages.map(lang=>
          (
            <li
              onClick={this.updateLanguage.bind(null, lang)}
              style={lang === this.state.selectedLanguage ? { color: '#d0021b' } : null}
              key={lang}>
              {lang}
            </li>
          )
        )}
      </ul>
    )
  }
}

module.exports = Popular;