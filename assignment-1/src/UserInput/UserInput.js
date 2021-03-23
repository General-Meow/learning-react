import React, {Component} from 'react'

class UserInput extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const inlineStyleUserInput = {
      width: '200px',
      display: 'inline-block',
      margin: '10px, auto',
      padding: '10px',

    };

    const inlineStylesInput = {
      margin: '10px'
    };

    return(
      <div style={inlineStyleUserInput}>
        <label>Type input here: </label>
        <input style={inlineStylesInput} type='text' onChange={this.props.updateUsernameHandler} value={this.props.username}/>
      </div>
    );
  }
}

export default UserInput;
