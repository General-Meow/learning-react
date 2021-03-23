import React from 'react';

const ValidationComponent = (props) => {
  return (
    <div>
      {props.text != null && props.text.length <= 5 ?
        <p>Text too short</p>
        :
        <p>Text long enough</p>
      }
    </div>
  );
}

export default ValidationComponent
