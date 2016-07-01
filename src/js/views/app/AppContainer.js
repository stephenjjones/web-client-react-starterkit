import React, { Component, PropTypes } from 'react';

import Header from 'js/components/Header';

class AppContainer extends Component {
  render() {
    const { children } = this.props;
    return (
      <div style={styles.container}>
        <Header />
        <div style={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.node
};

export default AppContainer;

const styles = {
  container: {
    backgroundColor: 'black',
    height: '100%'
  },
  content: {
    paddingTop: '15px',
    paddingLeft: '15px',
    paddingRight: '15px'
  }
}
