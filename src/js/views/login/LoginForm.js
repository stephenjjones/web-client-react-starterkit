import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

import Button from 'js/components/Button';

class LoginForm extends Component {
  render() {
    const { fields: {email, password}, dirty, handleSubmit } = this.props;
    return (
      <div style={styles.container}>
        <div>Login</div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formField}>
            <label>Email</label>
            <input style={styles.textInput} type='text' {...email} />
          </div>
          <div style={styles.formField}>
            <label>password</label>
            <input style={styles.textInput} type='password' {...password} />
          </div>
          <div style={styles.formField}>
            <Button kind='primary'>Login</Button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

LoginForm = reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
})(LoginForm);

export default LoginForm;

const styles = {
  container: {
    color: 'rgb(85, 205, 184)',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '16px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    color: 'black',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '30px'
  },
  formField: {
    marginBottom: '15px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column'
  }
}
