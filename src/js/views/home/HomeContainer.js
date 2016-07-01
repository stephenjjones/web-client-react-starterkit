import React, { Component, PropTypes } from 'react';


class HomeContainer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div>Home</div>
      </div>
    );
  }
}

HomeContainer.propTypes = {
};

export default HomeContainer;

const styles = {
  container: {
    color: 'rgb(85, 205, 184)',
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: '30px'
  }
}
