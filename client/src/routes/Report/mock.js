import React, { Component } from 'react';
import { PageHeader, Table } from 'react-bootstrap';
// import BootstrapTable from 'react-bootstrap-table-next';

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.dataSet = [
      {
        question: '55 × 85 = ?',
        correctAnswer: 4675,
        userAnswer: '4500',
        elapsedTime: 11.367,
        error: 3.7433155080213942,
        adjustedTime: 11.41092561956855
      },
      {
        question: '49 × 27 = ?',
        correctAnswer: 1323,
        userAnswer: '1350',
        elapsedTime: 11.436,
        error: 2.0408163265306145,
        adjustedTime: 11.448317079640614
      },
      {
        question: '24 × 24 = ?',
        correctAnswer: 576,
        userAnswer: '496',
        elapsedTime: 6.482,
        error: 13.888888888888884,
        adjustedTime: 7.156769344817771
      },
      {
        question: '56 × 75 = ?',
        correctAnswer: 4200,
        userAnswer: '3300',
        elapsedTime: 7.463,
        error: 21.42857142857143,
        adjustedTime: 9.218118983767997
      },
      {
        question: '73 × 91 = ?',
        correctAnswer: 6643,
        userAnswer: '6500',
        elapsedTime: 8.835,
        error: 2.1526418786692814,
        adjustedTime: 8.849291109023644
      }
    ];
  }

  componentDidMount() {
    const d3 = window.d3;
    d3.selectAll('p').text('Hi');
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
      <p />
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
        <tbody>{this.dataSet.map(this.makeRow)}</tbody>
      </Table>
    </>
  );
}
