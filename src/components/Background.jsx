import React from 'react';

const Background = ({ children }) => {
  return (
    <div style={styles.background}>
      {children}
    </div>
  );
};

const styles = {
  background: {
    backgroundColor: 'white'
  }
};

export default Background;
