import React, { Component } from 'react';
import { Redirect } from 'react-router';
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
    this.timeTaken = [];
    this.done = false;
  }

  async componentDidMount() {
    // console.log('id: ' + this.props.match.params.id);
    try {
      this.quiz = await API.get('num', `/module/${this.props.match.params.id}`);
      this.answers = new Array(this.quiz.questions.length);
      this.timeTaken = new Array(this.quiz.questions.length);
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
    this.timeTaken[this.state.questionNumber - 1] = 0.0; // TODO
    if (this.state.questionNumber < this.quiz.questions.length) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        answer: ''
      });
    } else {
			this.done = true;
    }
  };
  
  buildReportData(answers, timeTaken) {
  	var reportData = new Array(answers.length);
  	for(var i=0; i<answers.length; i++) {
  		reportData[i] = {}
  		reportData[i]["question"] = "Question " + i; // TODO
  		reportData[i]["expectedAnswer"] = 0.0; // TODO
  		reportData[i]["actualAnswer"] = answers[i];
  		reportData[i]["timeTaken"] = timeTaken[i];
  	}
  	return reportData;
  }

  render() {
  	if(this.done) {
    	var reportData = this.buildReportData(this.answers, this.timeTaken);
			return (<Redirect to={{
				pathname: '/report',
				state: { quizResults: reportData },
			}}/>);
  	} else {
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
}
