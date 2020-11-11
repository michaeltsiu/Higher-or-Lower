import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answer: 0,
      disabled: "",
      guesses: [],
      input: 0,
      tries: 0,
      message: ""
    }
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.changeState = this.changeState.bind(this);
    this.inputNumber = this.inputNumber.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  changeState(e) {
    this.setState({
      input: e.target.value
    })
  }

  componentDidMount() {
    this.generateRandomNumber();
  }

  generateRandomNumber() {
    this.setState({
      answer: Math.floor(Math.random()*100)+1
    })
  }

  inputNumber() {
    if (this.state.tries < 10) {
      if (!isNaN(this.state.input)) {
        if (this.state.input == this.state.answer) {
          this.setState({
            message: "WINNER"
          })
        } else {
          this.setState({
            guesses: this.state.guesses.concat(this.state.input)
          })
          if (this.state.input > this.state.answer) {
            this.setState({
              message: "TOO HIGH! CHOOSE A LOWER NUMBER",
              tries: this.state.tries + 1
            })
          } else {
            this.setState({
              message: "TOO LOW! CHOOSE A HIGHER NUMBER",
              tries: this.state.tries + 1
            })
          }
        }
      } else {
        this.setState({
          message: "CHOOSE A VALID NUMBER"
        })
      }
    } else {
      this.setState({
        message: `THE ANSWER IS ${this.state.answer}!`,
        disabled: "disabled"
      })
    }
  }

  resetGame() {
    this.setState({
      tries: 0,
      guesses: [],
    })
    this.generateRandomNumber();
  }

  render() {
    return (
      <div>
        <h1 className="title">Number Guessing Game</h1>
        <h2>{this.state.message}</h2>
        <div>
          <div>A random number has been selected between 1 and 100.</div>
          <div>Try to guess the number in 10 turns or fewer.</div>
          <div>I will let you know if your guess was too high or too low.</div>
        </div>
        <br/>
        <div>Previous Guesses: {this.state.guesses}</div>
        <br/>
        <div>Answer: {this.state.answer}</div>
        <br/>
        <div>Enter a number:
          <input value={this.state.input} onChange={this.changeState.bind(this)} maxLength="3"></input>
          <button onClick={this.inputNumber} disabled={this.state.disabled}>Submit guess</button>
        </div>
        <br/>
        <button onClick={this.resetGame}>Start new game</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));