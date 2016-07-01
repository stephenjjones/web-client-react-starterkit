import React, { Component, PropTypes } from 'react';

import LoginForm from './LoginForm';

class LoginContainer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <LoginForm />
      </div>
    );
  }
}

LoginContainer.propTypes = {
};

export default LoginContainer;

const styles = {
  container: {
  }
}
