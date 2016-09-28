import React from 'react';
import logo from './logo.svg'

var Header = React.createClass({
  render() {
    return (
      <div className='header'>
        <span className='header__logo'> <img src='https://mitul45.github.io/ta-calendar/0ef034683e41c42f958c3ea0cd3d1b47.svg'/> </span>
        <h2 className='header__text'> ta – calendar </h2>
      </div>
    );
  }
})

export default Header;
