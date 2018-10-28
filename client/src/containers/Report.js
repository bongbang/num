import React, { Component } from 'react';
import mockgraph from './mockgraph.png';

export default class Report extends Component {
  render() {
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
						7.8s
					</div>
				</div>

				<div className="bd-highlight border rounded">
					<div className="text-muted">
						Average Error
					</div>
					<div className="text-center display-4">
						11.0%
					</div>
				</div>

				<div className="bd-highlight border rounded">
					<div className="text-muted">
						Average Adjusted Time
					</div>
					<div className="text-center display-4">
						8.1s
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
						<tr>
							<th scope="row">1</th>
							<td>Given 400 Foos, how much is that in Bars?</td>
							<td>100</td>
							<td>100</td>
							<td className="text-success">0</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Julia Bell was born in 1991 and died in 2016, how old was she when she died?</td>
							<td>25</td>
							<td>90</td>
							<td className="text-danger">65</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>STCK closed at 874.26 yesterday and 852.09 today. How much did it drop by?</td>
							<td>22.17</td>
							<td>20.00</td>
							<td className="text-success">2.17</td>
						</tr>
						<tr>
							<th scope="row">4</th>
							<td>The speed limit is 55 MPH. How fast can you drive in km/h?</td>
							<td>88.51</td>
							<td>100</td>
							<td className="text-warning">11.49</td>
						</tr>
						<tr>
							<th scope="row">5</th>
							<td>Insert last question here?</td>
							<td>800001</td>
							<td>800000</td>
							<td className="text-success">1</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
    );
  }
}
