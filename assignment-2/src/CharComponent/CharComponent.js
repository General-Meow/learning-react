import React from 'react';

const CharComponent = (props) => {
  const styles = {
    display: 'inline-block',
    padding: '16px',
    textAlign: 'center',
    margin: '16px',
    border: '1px solid black',
  };
  return(
    <p style={styles} onClick={props.deleteCharHandler}>{props.text}</p>
  );
}

export default CharComponent
