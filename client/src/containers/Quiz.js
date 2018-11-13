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
      questionNumber: 1
    };

    this.quiz = [];
  }

  async componentDidMount() {
    // console.log('id: ' + this.props.match.params.id);
    try {
      this.quiz = await API.get('num', `/module/${this.props.match.params.id}`);
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.questionNumber < this.quiz.questions.length) {
      this.setState({ questionNumber: this.state.questionNumber + 1 });
    } else {
      alert('End of quiz. Go to report.');
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
            <FormControl />
          </FormGroup>
        </form>
      </div>
    );
  }
}
