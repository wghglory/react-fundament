# "this" keyword recap

* implicit binding: left of the dot at call time
* explicit binding
* new binding
* window binding

**where is this  function invoked?**

## Implicit Binding: left of the dot at call time

```javascript
var me = {
  name: 'guanghui',
  age: 25,
  sayName: function(name){
    console.log(this.name);  //this is me
  }
};

me.sayName();  //guanghui
```

example 2:

```javascript
var sayNameMixin = function(obj){
  obj.sayName = function(){
    console.log(this.name);  
  }
};

var me = {
  name: 'guanghui',
  age: 25
};

var you = {
  name: 'yuhan',
  age: 23
};

sayNameMixin(me);
sayNameMixin(you);

me.sayName();  //guanghui
you.sayName();  //yuhan
```

example 3:

```javascript
var Person = function (name, age) {
  return {
    name, age,
    sayName: function () {
      console.log(this.name);
    },
    mother: {
      name: 'Alice',
      sayName: function () {
        console.log(this.name);
      }
    }
  }
}

var guanghui = Person('guanghui', 22);
guanghui.sayName(); //guanghui
guanghui.mother.sayName();  //Alice
```

## Explicit binding with .call, .apply, and .bind: first param holds "this"

* call: first param passes the obj which indicates "this", other params are regular params. Invoke immediately.
* apply: first param passes the obj which indicates "this", the second is array. Invoke immediately.
* bind: first param passes the obj which indicates "this", return a function specifying the context ("this" keyword) inside that function, which can be invoked later.

```javascript
var me = {
  name: 'guanghui',
  age: 25
};

var sayName = function (lang1, lang2, lang3) {
  console.log(`My name is ${this.name}, I know ${lang1}, ${lang2} and ${lang3}.`);
}

var languages = ['javascript', 'c', 'c++'];

sayName.call(me);  //guanghui, this will be me
sayName.call(me, languages[0], languages[1], languages[2]); //My name is guanghui, I know javascript, c and c++.
sayName.apply(me, languages);  //My name is guanghui, I know javascript, c and c++.
sayName(...languages);  //My name is undefined, I know javascript, c and c++.

// bind will return a function, which can be invoked later. call just invoke immediately
var newFn = sayName.bind(me, languages[0], languages[1], languages[2]);
newFn();
```

## New binding: this is the obj created

```javascript
var Animal = function (color, name, type) {
  // this = {};  // 1. when new Animal() executed, js internally create this, pointing to empty obj
  this.color = color;  // 2. Developer initialize it 
  this.name = name;
  tis.type = type;
  // return this;  // 3. js return the obj
}

// this is obj "zebra"
var zebra = new Animal('black', 'Zorro', 'Zebra')
```

## Window binding

> note: if use strict (top or inside sayAge function), TypeError: Cannot read property 'age' of undefined

```javascript
// 'use strict';
var sayAge = function () {
  console.log(this.age)
}

var me = {
  age: 22
}

sayAge();  // this will be window, so age is undefined
sayAge.call(me);  // explicit call: 22
```

# Managing and Updating State

```jsx
// componenents/Popular.js
const React = require('react');

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };

    this.updateLanguage = this.updateLanguage.bind(this); 
    // now inside function, "this".setState always points to popular instance which inherits from React.Component
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
```