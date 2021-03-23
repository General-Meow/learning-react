import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
    };
  }

  textChangedHandler = (event) => {
    this.setState({
      textInput: event.target.value
    });
  }

  deleteCharHandler = (index) => {
    let newText = [...this.state.textInput].filter((char, i) => {
      return i !== index;
    });
    this.setState({
      textInput: newText.join(''),
    })
  }

  render() {

    const charItems = [...this.state.textInput].map( (char, index) => {
      return (
        <CharComponent key={index} text={char} deleteCharHandler={() => this.deleteCharHandler(index)}/>
      )
    })

    return (
      <div className="App">
        <input type="text" onChange={(event) => this.textChangedHandler(event)} value={this.state.textInput}></input>
        <p>The inputted text is: {this.state.textInput}
        </p>
        <ValidationComponent text={this.state.textInput}/>
        {charItems}
      </div>
    );
  }
}

export default App;
