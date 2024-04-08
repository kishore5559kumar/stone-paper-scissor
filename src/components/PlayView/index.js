import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
    testId: 'rockButton',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
    testId: 'scissorsButton',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
    testId: 'paperButton',
  },
]

class PlayView extends Component {
  state = {
    myChoice: '',
    myChoiceImageUrl: '',
    opponentChoice: '',
    opponentChoiceImageUrl: '',
    showResult: false,
    scoreCount: 0,
    resultMessage: '',
  }

  onclickButtons = event => {
    const {opponentChoice, myChoice} = this.state
    const randomChoice = Math.floor(Math.random() * 3)

    const myChoiceName = event.target.id
    const opponentChoiceName = choicesList[randomChoice].id

    const myChoiceIamge = event.target.src
    const opponentChoiceImage = choicesList[randomChoice].imageUrl

    this.setState({
      myChoice: myChoiceName,
      myChoiceImageUrl: myChoiceIamge,
      showResult: true,
      opponentChoice: opponentChoiceName,
      opponentChoiceImageUrl: opponentChoiceImage,
    })

    if (myChoice === 'ROCK' && opponentChoice === 'ROCK') {
      this.setState({resultMessage: 'IT IS DRAW'})
    } else if (myChoice === 'SCISSORS' && opponentChoiceName === 'SCISSORS') {
      this.setState({resultMessage: 'IT IS DRAW'})
    } else if (myChoice === 'PAPER' && opponentChoice === 'PAPER') {
      this.setState({resultMessage: 'IT IS DRAW'})
    } else if (myChoice === 'SCISSORS' && opponentChoice === 'PAPER') {
      this.setState({
        resultMessage: 'YOU WON',
      })
      this.setState(prevstate => ({scoreCount: prevstate.scoreCount + 1}))
    } else if (myChoice === 'PAPER' && opponentChoice === 'SCISSORS') {
      this.setState({
        resultMessage: 'YOU LOSE',
      })
      this.setState(prevstate => ({scoreCount: prevstate.scoreCount - 1}))
    } else if (myChoice === 'SCISSORS' && opponentChoice === 'ROCK') {
      this.setState({
        resultMessage: 'YOU LOSE',
      })
      this.setState(prevstate => ({scoreCount: prevstate.scoreCount - 1}))
    } else if (myChoice === 'ROCK' && opponentChoice === 'SCISSORS') {
      this.setState({
        resultMessage: 'YOU WON',
      })
      this.setState(prevstate => ({scoreCount: prevstate.scoreCount + 1}))
    } else if (myChoice === 'PAPER' && opponentChoice === 'ROCK') {
      this.setState({
        resultMessage: 'YOU WON',
      })
      this.setState(prevstate => ({scoreCount: prevstate.scoreCount + 1}))
    } else if (myChoice === 'ROCK' && opponentChoice === 'PAPER') {
      this.setState({
        resultMessage: 'YOU LOSE',
      })
      this.setState(prevstate => ({scoreCount: prevstate.scoreCount - 1}))
    }
  }

  renderGameView = () => (
    <div className="list-container">
      {choicesList.map(eachItem => (
        <li key={eachItem.id} onClick={this.onclickButtons} value={eachItem.id}>
          <button
            className="button-styling"
            data-testid={eachItem.testId}
            type="button"
          >
            <img
              className="images-style"
              src={eachItem.imageUrl}
              alt={eachItem.id}
              id={eachItem.id}
            />
          </button>
        </li>
      ))}
    </div>
  )

  onclickPlayAgain = () => {
    this.setState({showResult: false})
  }

  renderResultView = () => {
    const {myChoiceImageUrl, opponentChoiceImageUrl, resultMessage} = this.state

    return (
      <div className="game-results-page">
        <div className="game-results-card-containers">
          <div className="game-results-my-Choice">
            <p className="game-results-person-name">YOU</p>
            <img
              className="images-style"
              src={myChoiceImageUrl}
              alt="your choice"
            />
          </div>
          <div className="game-results-my-Choice">
            <p className="game-results-person-name">OPPONENT</p>
            <img
              className="images-style"
              src={opponentChoiceImageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <div className="play-again-container">
          <p className="game-result-text">{resultMessage}</p>
          <button
            className="play-agian-button"
            type="button"
            onClick={this.onclickPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {showResult, scoreCount} = this.state

    return (
      <div className="playing-view-container">
        <div className="navbar-container">
          <h1 className="navbar-header">
            ROCK
            <br />
            PAPER
            <br />
            SCISSORS
          </h1>
          <div className="navbar-score-card">
            <p className="sub-header">Score</p>
            <p className="score-count-value">{scoreCount}</p>
          </div>
        </div>
        <div className="play-view-page">
          <div className="play-view-card">
            {showResult ? this.renderResultView() : this.renderGameView()}
          </div>
        </div>
        <Popup
          modal
          trigger={
            <button className="rules-button" type="button">
              RULES
            </button>
          }
          className="popup-content"
        >
          {close => (
            <div className="modal-container">
              <button
                className="close-button"
                type="button"
                data-testid="closeButton"
                onClick={() => close()}
              >
                <RiCloseLine size="30" color="#616e7c" />l
              </button>

              <img
                className="rules-image"
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

export default PlayView
