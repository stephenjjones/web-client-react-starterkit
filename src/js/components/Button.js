import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

class Button extends Component {
  render() {
    const { children } = this.props;
    return (
      <button style={[styles.base, styles[this.props.kind]]}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  kind: PropTypes.oneOf(['primary', 'warning']).isRequired,
  children: PropTypes.node
};

export default Radium(Button);

const styles = {
  base: {
    border: '0',
    height: '40px',
    ':hover': {
    }
  },
  primary: {
    background: 'rgb(77, 254, 251)',
    color: 'rgb(0, 0, 0)',
  },
  warning: {
    background: '#FF4136'
  }
};
