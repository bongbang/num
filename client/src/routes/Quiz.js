import React, { Component } from 'react';
// import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { Card, FormGroup, FormControl } from 'react-bootstrap';
import Report from './Report';
// import { s3Upload } from '../libs/awsLib';
// import config from '../config';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      i: 0,
      answer: '',
      isCompleted: false
    };

    this.quiz = [];
    this.resultSet = []; //TODO define length here if URL contains count and remove below
  }

  async componentDidMount() {
    // console.log('id: ' + this.props.match.params.id);
    try {
      this.quiz = await API.get('num', `/module/${this.props.match.params.id}`);
      this.resultSet = new Array(this.quiz.questions.length); //TODO remove if defined above
      this.startTime = new Date().getTime();
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  handleChange = event => {
    this.setState({ answer: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.resultSet[this.state.i] = {
      question: this.quiz.questions[this.state.i],
      correctAnswer: this.quiz.answers[this.state.i],
      userAnswer: this.state.answer,
      elapsedTime: (new Date().getTime() - this.startTime) / 1000
    };
    if (this.state.i < this.resultSet.length - 1) {
      this.setState({
        i: this.state.i + 1,
        answer: ''
      });
      this.startTime = new Date().getTime();
    } else {
      this.setState({ isCompleted: true });
    }
  };

  renderQuiz = () => (
    <>
      <h1>Quiz</h1>
      <p>{this.state.i + 1}.</p>
      <Card>{!this.state.isLoading && this.quiz.questions[this.state.i]}</Card>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="answer">
          <FormControl
            autoFocus
            value={this.state.answer}
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    </>
  );

  render() {
    return this.state.isCompleted
      ? React.createElement(Report, { data: this.resultSet })
      : // <Report quiz={this.quiz} userresultSet={this.resultSet} />
        this.renderQuiz();
  }
}
