import { calculateError, calculateAdjustedTime } from '../resultCalculator.js';

import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import mockgraph from './mockgraph.png';

function QuizResult(props) {
  var averageTime = 0.0;
  var averageError = 0.0;
  var adjustedTime = 0.0;

  var resultDisplay = [];
  for (var i = 0; i < props.results.length; i++) {
    var error = calculateError(
      props.results[i].expectedAnswer,
      props.results[i].actualAnswer
    );

    resultDisplay.push(
      <tr>
        <th scope="row">i</th>
        <td>{props.results[i].question}</td>
        <td>{props.results[i].expectedAnswer}</td>
        <td>{props.results[i].actualAnswer}</td>
        <td>{Number.parseFloat(error * 100.0).toFixed(3)}%</td>
      </tr>
    );

    averageTime += props.results[i].timeTaken;
    averageError += error;
  }

  averageTime /= props.results.length;
  averageError /= props.results.length;
  adjustedTime = calculateAdjustedTime(averageTime, averageError);

  return (
    <Container>
      <Row>
        <div className="px-5">
          <h2 className="display-2">Report card</h2>
        </div>
      </Row>

      <Row>
        <ul className="pagination bd-highlight my-0">
          <li className="page-item active">
            <a className="page-link" href="#">
              Adjusted Time
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Time vs. Error
            </a>
          </li>
        </ul>
      </Row>
      <Row>
        <img src={mockgraph} width="800" height="600" />
      </Row>

      <Row>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Problem Number</th>
              <th scope="col">Question</th>
              <th scope="col">Correct Answer</th>
              <th scope="col">Your Answer</th>
              <th scope="col">Error</th>
            </tr>
          </thead>
          <tbody>{resultDisplay}</tbody>
        </table>
      </Row>
    </Container>
  );
}

export default class Report extends Component {
<<<<<<< HEAD
	render() {
		const results = this.props.location.state.quizResults;
		// TODO: calculate average time, adjusted time, and error from results.
		return <QuizResult
			averageTime="9.4"
			averageError="11.2"
			adjustedTime="8.7"
			results={results}
		/>
	}
=======
  render() {
    const results = [
      {
        question: 'Given 200 Foos, how much is that in Bars?',
        expectedAnswer: 100,
        actualAnswer: 100,
        timeTaken: 1.1
      },
      {
        question:
          'Julia Bell was born in 1990 and died in 2015, how old was she when she died?',
        expectedAnswer: 25,
        actualAnswer: 90,
        timeTaken: 1.2
      },
      {
        question:
          'STOCK closed at 874.25 yesterday and 852.08 today. How much did it drop by?',
        expectedAnswer: 22.17,
        actualAnswer: 20,
        timeTaken: 1.3
      },
      {
        question: 'The speed limit is 55 mi/h. How fast can you drive in km/h?',
        expectedAnswer: 88.51,
        actualAnswer: 100,
        timeTaken: 1.5
      },
      {
        question: 'The answer is 500000. What is the answer?',
        expectedAnswer: 500000,
        actualAnswer: 500001,
        timeTaken: 1.8
      }
    ];
    // TODO: calculate average time, adjusted time, and error from results.
    return (
      <QuizResult
        averageTime="9.4"
        averageError="11.2"
        adjustedTime="8.7"
        results={results}
      />
    );
  }
>>>>>>> exp/new_folder_structure
}
