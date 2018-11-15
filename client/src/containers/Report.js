import {calculateError, calculateAdjustedTime} from '../resultCalculator.js';

import React, { Component } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

import mockgraph from './mockgraph.png';

function QuizResult(props) {
	var averageTime = 0.0;
	var averageError = 0.0;
	var adjustedTime = 0.0;
	
	var resultDisplay = [];
	for(var i = 0; i < props.results.length; i++) {
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
		<Grid>

			<Row>
				<div className="px-5">
					<h2 className="display-2">Report card</h2>
				</div>
			</Row>

			<Row> {/*justify-content-between*/}
				<Col xs={0} md={1}/>
				<Col xs={12} md={2}>
					<Panel>
						<Panel.Heading>
							Average Time
						</Panel.Heading>
						<Panel.Body>
							{Number.parseFloat(averageTime).toFixed(3)}s
						</Panel.Body>
					</Panel>
				</Col>

				<Col xs={0} md={2}/>

				<Col xs={12} md={2}>
					<Panel>
						<Panel.Heading>
							Average Error
						</Panel.Heading>
						<Panel.Body>
							{/* We multiply by 100.0 to turn averageError into a percent */}
							{Number.parseFloat(averageError * 100.0).toFixed(3)}%
						</Panel.Body>
					</Panel>
				</Col>

				<Col xs={0} md={2}/>

				<Col xs={12} md={3}>
					<Panel>
						<Panel.Heading>
							Average Adjusted Time
						</Panel.Heading>
						<Panel.Body>
							{Number.parseFloat(adjustedTime).toFixed(3)}s
						</Panel.Body>
					</Panel>
				</Col>

			</Row>

			<Row>
				<ul className="pagination bd-highlight my-0">
					<li className="page-item active">
						<a className="page-link" href="#">Adjusted Time</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">Time vs. Error</a>
					</li>
				</ul>
			</Row>
			<Row>
				<img src={mockgraph} width="800" height="600"/>
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
					<tbody>
						{resultDisplay}
					</tbody>
				</table>
			</Row>

		</Grid>
	);
}

export default class Report extends Component {
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
}
