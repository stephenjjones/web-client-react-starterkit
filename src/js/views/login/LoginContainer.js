import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { login } from 'js/actions';
import LoginForm from './LoginForm';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    this.props.login(formData.email, formData.password);
  }

  render() {
    return (
      <div style={styles.container}>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

const styles = {
  container: {
  }
}
