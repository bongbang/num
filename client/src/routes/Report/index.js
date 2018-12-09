import React, { Component } from 'react';
import { Table, Card } from 'react-bootstrap';
import Plot from './Plot';
// import BootstrapTable from 'react-bootstrap-table-next';

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.props.data.map(function(d) {
      d.error = Math.abs(d.userAnswer / d.correctAnswer - 1) * 100;
      d.adjustedTime =
        d.elapsedTime +
        160 * Math.pow(Math.log10(d.userAnswer / d.correctAnswer), 2);
      return d;
    });

    const mean = window.d3.mean; //TODO Change to import
    this.avgElapsedTime = mean(this.props.data, d => d.elapsedTime);
    this.avgAdjustedTime = mean(this.props.data, d => d.adjustedTime);
    this.avgError = mean(this.props.data, d => d.error);
  }

  componentDidMount() {
    Plot(this.props.data); // TODO Move to render()?
  }

  packageRow = (...row) => (
    <tr>{row.map(x => React.createElement('td', null, x))}</tr>
  );

  makeRow = (d, i) =>
    this.packageRow(
      i + 1,
      d.question,
      d.userAnswer,
      d.correctAnswer,
      d.error.toFixed(1),
      d.elapsedTime.toFixed(1),
      d.adjustedTime.toFixed(1)
    );

  makePanel = (title, value) => (
    <div class="col-sm">
      <Card>
        <Card.Body>
          <h4 class="card-title"> {title} </h4>
          <p> {value} </p>
        </Card.Body>
      </Card>
    </div>
  );

  render = () => (
    <>
      <h1>Quiz reportcard</h1>
      <div class="row">
        {this.makePanel('Time avg', this.avgElapsedTime)}
        {this.makePanel('Time avg', this.avgError)}
        {this.makePanel('Time avg', this.avgAdjustedTime)}
      </div>
      <div id="chart" />
      <Table bordered condensed hover responsive>
        <thead>
          {this.packageRow(
            '#',
            'Question',
            'Answer',
            'Correct Answer',
            'Error',
            'Time',
            'Adjusted Time'
          )}
        </thead>
        <tbody>{this.props.data.map(this.makeRow)}</tbody>
      </Table>
    </>
  );
}
