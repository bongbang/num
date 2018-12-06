import React, { Component } from 'react';
import { PageHeader, Table } from 'react-bootstrap';
import Plot from './Plot';
// import BootstrapTable from 'react-bootstrap-table-next';

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.props.dataSet.map(function(d) {
      d.error = Math.abs(d.userAnswer / d.correctAnswer - 1) * 100;
      d.adjustedTime =
        d.elapsedTime +
        160 * Math.pow(Math.log10(d.userAnswer / d.correctAnswer), 2);
      return d;
    });
  }

  componentDidMount() {
    Plot(this.props.dataSet);
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

  render = () => (
    <>
      <PageHeader>Quiz reportcard</PageHeader>
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
        <tbody>{this.props.dataSet.map(this.makeRow)}</tbody>
      </Table>
    </>
  );
}
