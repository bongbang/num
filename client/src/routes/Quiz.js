import React, { Component } from 'react';
// import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { API } from 'aws-amplify';
import { PageHeader, Well, FormGroup, FormControl } from 'react-bootstrap';
// import { s3Upload } from '../libs/awsLib';
// import config from '../config';

export default class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      questionNumber: 1,
      answer: ''
    };

    this.quiz = [];
    this.answers = [];
  }

  async componentDidMount() {
    // console.log('id: ' + this.props.match.params.id);
    try {
      this.quiz = await API.get('num', `/module/${this.props.match.params.id}`);
      this.answers = new Array(this.quiz.questions.length);
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
    this.answers[this.state.questionNumber - 1] = this.state.answer;
    if (this.state.questionNumber < this.quiz.questions.length) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        answer: ''
      });
    } else {
      alert(
        'Answers: ' + this.answers.join(', ') + '\n' + 'To be sent to Report'
      );
    }
  };

  render() {
    return (
      <div className="Home">
        <PageHeader>Quiz</PageHeader>
        <p>{this.state.questionNumber}.</p>
        <Well>
          {!this.state.isLoading &&
            this.quiz.questions[this.state.questionNumber - 1]}
        </Well>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="answer">
            <FormControl
              autoFocus
              value={this.state.answer}
              onChange={this.handleChange}
            />
          </FormGroup>
        </form>
      </div>
    );
  }
}
