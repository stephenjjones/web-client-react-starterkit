import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Header extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Link style={styles.logo} to={`/`}>Logo</Link>
        <Link style={styles.login} to={`/login`}>Login</Link>
      </div>
    );
  }
}

Header.propTypes = {
};

export default Header;

const styles = {
  container: {
    backgroundColor: 'rgb(30,51,48)',
    color: 'rgb(85, 205, 184)',
    height: '51px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '15px',
    paddingRight: '15px'
  },
  logo: {
    color: 'rgb(85, 205, 184)',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '30px',
    textDecoration: 'none'
  },
  login: {
    color: 'rgb(85, 205, 184)',
    fontFamily: '"Courier New", Courier, monospace',
    marginLeft: 'auto',
    textDecoration: 'none'
  }
}
