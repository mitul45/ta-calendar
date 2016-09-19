import React from 'react';
import logo from './logo.png'

var Header = React.createClass({
  render() {
    return (
      <div className='header'>
        <span className='header__logo'> <img src={logo}/> </span>
        <h2 className='header__text'> ta – calendar </h2>
      </div>
    );
  }
})

export default Header;
