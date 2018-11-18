import React from 'react';
import { PageHeader, Table } from 'react-bootstrap';
// import BootstrapTable from 'react-bootstrap-table-next';

export default function({ dataSet }) {
  dataSet.map(function(d) {
    d.error = Math.abs(d.userAnswer / d.correctAnswer - 1) * 100;
    d.adjustedTime =
      d.elapsedTime +
      160 * Math.pow(Math.log10(d.userAnswer / d.correctAnswer), 2);
    return d;
  });

  const packageRow = (...row) => (
    <tr>{row.map(x => React.createElement('td', null, x))}</tr>
  );

  const makeRow = (d, i) =>
    packageRow(
      i + 1,
      d.question,
      d.userAnswer,
      d.correctAnswer,
      d.error.toFixed(1),
      d.elapsedTime.toFixed(1),
      d.adjustedTime.toFixed(1)
    );

  return (
    <>
      <PageHeader>Quiz reportcard</PageHeader>
      <Table bordered condensed hover responsive>
        <thead>
          {packageRow(
            '#',
            'Question',
            'Answer',
            'Correct Answer',
            'Error',
            'Time',
            'Adjusted Time'
          )}
        </thead>
        <tbody>{dataSet.map(makeRow)}</tbody>
      </Table>
    </>
  );
}
