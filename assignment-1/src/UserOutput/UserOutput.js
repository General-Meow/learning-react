import React from 'react'
import './UserOutput.css'

const UserOutput = (props) => {
  return(
    <div class='UserOutput'>
      <p>output component</p>
      <p>{props.username}</p>
      <p></p>
    </div>
  );
}

export default UserOutput
