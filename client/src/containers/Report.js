import React, { Component } from 'react';
import mockgraph from './mockgraph.png';

function QuizResult(props) {
	var resultDisplay = [];
	for(var i = 0; i < props.results.length; i++) {
		resultDisplay.push(
			<tr>
				<th scope="row">i</th>
				<td>{props.results[i].question}</td>
				<td>{props.results[i].expectedAnswer}</td>
				<td>{props.results[i].actualAnswer}</td>
				<td>TODO</td>
			</tr>
		)
	}

	return (
		<div className="container">

			<div className="row justify-content-center">
				<div className="px-5">
					<h2 className="display-2">Report card</h2>
				</div>
			</div>

			<div className="row d-flex bd-highlight justify-content-between">
				<div className="bd-highlight border rounded">
					<div className="text-muted">
						Average Time
					</div>
					<div className="text-center display-4">
						{props.averageTime}s
					</div>
				</div>

				<div className="bd-highlight border rounded">
					<div className="text-muted">
						Average Error
					</div>
					<div className="text-center display-4">
						{props.averageError}%
					</div>
				</div>

				<div className="bd-highlight border rounded">
					<div className="text-muted">
						Average Adjusted Time
					</div>
					<div className="text-center display-4">
						{props.adjustedTime}s
					</div>
					</div>
			</div>

			<div className="row my-3">
				<div className="container-fluid">
					<div className="row">
						<ul className="pagination bd-highlight my-0">
							<li className="page-item active">
								<a className="page-link" href="#">Adjusted Time</a>
							</li>
							<li className="page-item">
								<a className="page-link" href="#">Time vs. Error</a>
							</li>
						</ul>
					</div>
					<div className="row">
						<img src={mockgraph} width="800" height="600"/>
					</div>
				</div>
			</div>

			<div className="row border rounded">
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
			</div>

		</div>
	);
}

export default class Report extends Component {
	render() {
		const results = [
			{
				question: "Given 200 Foos, how much is that in Bars?",
				expectedAnswer: 100,
				actualAnswer: 100,
				timeTaken: 1.1,
			},
			{
				question: "Julia Bell was born in 1990 and died in 2015, how old was she when she died?",
				expectedAnswer: 25,
				actualAnswer: 90,
				timeTaken: 1.2,
			},
			{
				question: "STOCK closed at 874.25 yesterday and 852.08 today. How much did it drop by?",
				expectedAnswer: 22.17,
				actualAnswer: 20.,
				timeTaken: 1.3,
			},
			{
				question: "The speed limit is 55 mi/h. How fast can you drive in km/h?",
				expectedAnswer: 88.51,
				actualAnswer: 100.,
				timeTaken: 1.5,
			},
			{
				question: "The answer is 500000. What is the answer?",
				expectedAnswer: 500000,
				actualAnswer: 500001,
				timeTaken: 1.8,
			},
		];
		// TODO: calculate average time, adjusted time, and error from results.
		return <QuizResult
			averageTime="9.4"
			averageError="11.2"
			adjustedTime="8.7"
			results={results}
		/>
	}
}
