import './App.css';
import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'
import React, {Component} from 'react'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: 'bob'
    };

    console.log(this.state);
  }

  updateUsernameHandler = (event) => {
    this.setState({
      username: event.target.value
    });

    console.log('derp', this.state);
  }

  render(){
    return (
      <div className="App">
        <UserInput updateUsernameHandler={this.updateUsernameHandler} username={this.state.username}/>

        <UserOutput username={this.state.username}/>
        <UserOutput/>
        <UserOutput/>
      </div>
    );
  }
}

export default App;
